"use client";
import { useState } from "react";
import { Slider } from "../app/components/Slider";
import { SlideViewModel } from "../app/viewModels/SlideViewModel";

export default function PresentationPage() {
    const [viewModel] = useState(() => new SlideViewModel());

    return (
        <div>
            <Slider viewModel={viewModel} />
        </div>
    );
}
