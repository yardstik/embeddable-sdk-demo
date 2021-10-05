/// <reference types="node" />
import { EventEmitter } from 'events';
import { ReportIframeInterface, AccountDisclosuresIframeInterface } from './iframeInterfaces';
export declare class YardstikIframe extends EventEmitter {
    iframe: HTMLIFrameElement;
    domain: string;
    onMessage: (event: MessageEvent) => void;
    destroy(): void;
    onLoaded: () => void;
    onExpiration: () => void;
}
export declare class CandidateReportIframe extends YardstikIframe {
    iframe: HTMLIFrameElement;
    constructor(params: ReportIframeInterface);
}
export declare class AccountDisclosuresIframe extends YardstikIframe {
    iframe: HTMLIFrameElement;
    constructor(params: AccountDisclosuresIframeInterface);
}
export declare const Yardstik: {
    CandidateReportIframe: typeof CandidateReportIframe;
    AccountDisclosuresIframe: typeof AccountDisclosuresIframe;
};
//# sourceMappingURL=iframe.d.ts.map