import { SummaryModel } from "@/app/create/models/SummaryModel";
import {makeAutoObservable} from "mobx";
import { UniqueIdentifier } from "@dnd-kit/core";

export class SummaryViewModel {
    summaryData: SummaryModel[] = [];

    constructor() {
        makeAutoObservable(this);
    }


    async updateSummaryItem(updatedItems: SummaryModel[], movedItemId: UniqueIdentifier) {
        try {
            const movedIndex = updatedItems.findIndex(item => item.id === movedItemId);

            if (movedIndex === - 1) return;

            const response = await fetch("", {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    number: movedIndex + 1,
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update item');
            }

            this.summaryData = updatedItems;
        } catch (error) {
            console.error('Error updating item:', error);
            throw error;
        }
    }
}

export const summaryStore = new SummaryViewModel();
