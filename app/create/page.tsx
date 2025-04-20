"use client";
import {useState} from "react";
import {SortableList} from "@/app/create/components/SortableList/SortableList";
import {observer} from "mobx-react-lite";
import {useRouter} from "next/navigation";


const Create = () => {
    const router = useRouter();
    const [items, setItems] = useState([
        {
            id: "1",
            number: 1,
            description: "hello"
        },
        {
            id: "2",
            number: 2,
            description: "aye"
        },
        {
            id: "3",
            number: 3,
            description: "sosta + lejat"
        },
    ]);


    const handleGenerate = (id: string) => {
        router.push(`/create/${id}`);
    }


    return (
        <div style={{ maxWidth: 400, margin: "30px auto" }}>
            <SortableList
                items={items}
                onChange={setItems}
                renderItem={(item) => (
                    <SortableList.Item id={item.id}>
                        {item.id}
                        {item.description}
                        <SortableList.DragHandle />
                    </SortableList.Item>
                )}
            />

            <button onClick={() => handleGenerate("1")}>Генерировать</button>
        </div>
    );
};


export default observer(Create);




