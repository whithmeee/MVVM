"use client";
import {
    UniqueIdentifier,
    Active,
    useSensors,
    useSensor,
    PointerSensor,
    KeyboardSensor,
    DndContext
} from "@dnd-kit/core";
import {ReactNode, useMemo, useState} from "react";
import {
    SortableContext,
    arrayMove,
    sortableKeyboardCoordinates
} from "@dnd-kit/sortable";
import {SortableOverlay} from "@/app/create/components/SortableOverlay/SortableOverlay";
import {DragHandle, SortableItem} from "@/app/create/components/SortableItem/SortableItem";
import React from "react";
import './SortableList.css';
import {summaryStore} from "@/app/create/viewModels/SummaryViewModel";

interface BaseItem {
    id: UniqueIdentifier;
}

interface Props<T extends BaseItem> {
    items: T[];
    onChange(items: T[]): void;
    renderItem(item: T): ReactNode;
}

export function SortableList<T extends BaseItem>({items, onChange,renderItem}: Props<T>) {
    const [active, setActive] = useState<Active | null>(null);
    const activeItem = useMemo(
        () => items.find((item) => item.id === active?.id),
        [active, items]
    );

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates
        })
    );


    return (
        <DndContext sensors={sensors} onDragStart={({active}) => {
            setActive(active);
        }}
        onDragEnd={async({active, over}) => {
            if (over && active.id !== over.id) {
                const activeIndex = items.findIndex(({ id }) => id === active.id);
                const overIndex = items.findIndex(({ id }) => id === over.id);
                const newItems = arrayMove(items, activeIndex, overIndex);

                // Сначала оптимистично обновляем UI
                onChange(newItems);

                try {
                    await summaryStore.updateSummaryItem(newItems, active.id)
                } catch (error) {
                    onChange(items);
                }
            }
            setActive(null);
        }}
                    onDragCancel={() => {
                        setActive(null);
                    }}
        >
        <SortableContext items={items}>
            <ul className="SortableList" role="application">
                {items.map((item) =>
                <React.Fragment key={item.id}>
                    {renderItem(item)}
                </React.Fragment>
                )}
            </ul>
        </SortableContext>
            <SortableOverlay>
                {activeItem ? renderItem(activeItem) : null}
            </SortableOverlay>
        </DndContext>
    );
}


SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle;


