/// <reference types="node" />
import { EventEmitter } from 'events';
import { ReportIframeInterface } from './iframeInterfaces';
export declare const returnReportIframe: () => string;
export declare class CandidateReportIframe extends EventEmitter {
    iframe: HTMLIFrameElement;
    constructor(params: ReportIframeInterface);
    onMessage: (event: MessageEvent) => void;
    destroy(): void;
    onLoaded: () => void;
    onExpiration: () => void;
}
export declare const YardstikCandidateReportIframe: {
    CandidateReportIframe: typeof CandidateReportIframe;
};
//# sourceMappingURL=iframe.d.ts.map