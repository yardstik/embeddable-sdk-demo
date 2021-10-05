"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Yardstik = exports.AccountDisclosuresIframe = exports.CandidateReportIframe = exports.YardstikIframe = void 0;
const events_1 = require("events");
const lodash_1 = require("lodash");
class YardstikIframe extends events_1.EventEmitter {
    constructor() {
        super(...arguments);
        this.onMessage = (event) => {
            if (event.origin !== this.domain) {
                return;
            }
            let message;
            try {
                message = JSON.parse(event.data);
            }
            catch (e) { }
            if (!message) {
                return;
            }
            const messageName = lodash_1.get(message, 'name', '');
            switch (messageName) {
                case 'yardstik:loaded':
                    this.onLoaded();
                    break;
                case 'yardstik:tokenExpiration':
                    this.onExpiration();
                    break;
                default:
                    break;
            }
        };
        this.onLoaded = () => {
            this.emit('loaded', true);
        };
        this.onExpiration = () => {
            this.emit('expiration', true);
        };
    }
    destroy() {
        if (this.iframe) {
            this.iframe.remove();
        }
    }
}
exports.YardstikIframe = YardstikIframe;
class CandidateReportIframe extends YardstikIframe {
    constructor(params) {
        super();
        const { token, reportId, container, width = '800', height = '600', domain, fullScreen = false } = params;
        if (!token || !reportId || !container || !domain) {
            throw new Error('token, reportId and container are required');
        }
        const iframeUrl = `${domain}/embed/report/${reportId}?jwt=${token}`;
        const iframe = document.createElement('iframe');
        iframe.src = iframeUrl;
        if (fullScreen) {
            iframe.setAttribute('style', 'position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:100000;');
        }
        else {
            iframe.setAttribute('width', width);
            iframe.setAttribute('height', height);
            iframe.setAttribute('style', 'border: 1px solid #656565');
        }
        container.appendChild(iframe);
        this.iframe = iframe;
        this.domain = domain;
        window.addEventListener('message', this.onMessage);
    }
}
exports.CandidateReportIframe = CandidateReportIframe;
class AccountDisclosuresIframe extends YardstikIframe {
    constructor(params) {
        super();
        const { token, accountId, container, width = '800', height = '600', domain, fullScreen = false } = params;
        if (!token || !accountId || !container || !domain) {
            throw new Error('token, accountId, container and domain are required');
        }
        const iframeUrl = `${domain}/embed/signDisclosures/${accountId}?jwt=${token}`;
        const iframe = document.createElement('iframe');
        iframe.src = iframeUrl;
        if (fullScreen) {
            iframe.setAttribute('style', 'position:fixed; top:0; left:0; bottom:0; right:0; width:100%; height:100%; border:none; margin:0; padding:0; overflow:hidden; z-index:100000;');
        }
        else {
            iframe.setAttribute('width', width);
            iframe.setAttribute('height', height);
            iframe.setAttribute('style', 'border: 1px #656565 solid');
        }
        container.appendChild(iframe);
        this.iframe = iframe;
        this.domain = domain;
        window.addEventListener('message', this.onMessage);
    }
}
exports.AccountDisclosuresIframe = AccountDisclosuresIframe;
exports.Yardstik = {
    CandidateReportIframe,
    AccountDisclosuresIframe,
};
//# sourceMappingURL=iframe.js.map