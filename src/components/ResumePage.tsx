// src/ResumePage.tsx
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker, Viewer } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

export default function ResumePage() {
    const defaultLayout = defaultLayoutPlugin();

    return (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <div style={{ height: '100vh' }}>
                <Viewer fileUrl="/emrelutficom.pdf" plugins={[defaultLayout]} />
            </div>
        </Worker>
    );
}
