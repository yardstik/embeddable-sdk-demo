"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const iframe_1 = require("./iframe");
describe('CandidateReportIframe Class', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    test('throws an error if missing required props', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            width: '100',
            height: '100',
            domain: '',
            fullScreen: false,
        };
        expect(() => { new iframe_1.CandidateReportIframe(testCandidateReportParams); }).toThrow(Error);
    });
    test('a new iframe is created when passed props', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '100',
            fullScreen: false,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(container.firstChild).toBe(candidateReport.iframe);
    });
    test('the correct domain is applied to the class', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '100',
            fullScreen: false,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.domain).toBe('test');
    });
    test('the correct width is applied to the iframe', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: false,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.iframe.width).toBe('100');
    });
    test('the correct height is applied to the iframe', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: false,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.iframe.height).toBe('150');
    });
    test('fullscreen styles are added if fullScreen param is true', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.iframe.style['z-index']).toBe("100000");
    });
    test('destroy method removes iframe', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        candidateReport.destroy();
        expect(container.firstChild).toBe(null);
    });
    test('onMessage returns undefined if event comes from different domain', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'http://yardstik.com',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const messageEvent = new MessageEvent('message', {
            data: "{\"name\":\"yardstik:loaded\",\"data\":{\"loaded\":true}}",
            origin: "http://localhost:8080"
        });
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.onMessage(messageEvent)).toBeUndefined();
    });
    test('onMessage returns undefined if message is undefined', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'http://localhost:8080',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const messageEvent = new MessageEvent('message', {
            origin: "http://localhost:8080",
            data: null
        });
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.onMessage(messageEvent)).toBeUndefined();
    });
    test('onMessage returns undefined if message cannot be parsed', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'http://localhost:8080',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const messageEvent = new MessageEvent('message', {
            origin: "http://localhost:8080",
            data: "{\"name\":\"yardstik:loaded\",\"data\":{\"loaded\"}}",
        });
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.onMessage(messageEvent)).toBeUndefined();
    });
    test('onMessage fires loaded event if loaded message is received', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'http://localhost:8080',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const messageEvent = new MessageEvent('message', {
            data: "{\"name\":\"yardstik:loaded\",\"data\":{\"loaded\":true}}",
            origin: "http://localhost:8080"
        });
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        const handler = jest.fn();
        candidateReport.on('loaded', handler);
        candidateReport.onMessage(messageEvent);
        expect(handler).toBeCalledTimes(1);
    });
    test('onMessage returns undefined if not a valid message', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'http://localhost:8080',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const messageEvent = new MessageEvent('message', {
            data: "{\"name\":\"yardstik:none\",\"data\":{\"loaded\":true}}",
            origin: "http://localhost:8080"
        });
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        expect(candidateReport.onMessage(messageEvent)).toBeUndefined();
    });
    test('onMessage fires expiration event if expiration message is received', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'http://localhost:8080',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const messageEvent = new MessageEvent('message', {
            data: "{\"name\":\"yardstik:tokenExpiration\",\"data\":{\"expiration\":true}}",
            origin: "http://localhost:8080"
        });
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        const handler = jest.fn();
        candidateReport.on('expiration', handler);
        candidateReport.onMessage(messageEvent);
        expect(handler).toBeCalledTimes(1);
    });
    test('onLoaded emits loading event', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        const handler = jest.fn();
        candidateReport.on('loaded', handler);
        candidateReport.onLoaded();
        expect(handler).toBeCalledTimes(1);
    });
    test('onExpiration emits expiration event', () => {
        const testCandidateReportParams = {
            token: '123456',
            container,
            reportId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const candidateReport = new iframe_1.CandidateReportIframe(testCandidateReportParams);
        const handler = jest.fn();
        candidateReport.on('expiration', handler);
        candidateReport.onExpiration();
        expect(handler).toBeCalledTimes(1);
    });
});
describe('AccountDisclosuresIframe Class', () => {
    let container;
    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    });
    test('throws an error if missing required props', () => {
        const testAccountDisclosuresParams = {
            token: '123456',
            container,
            accountId: '123456',
            domain: '',
            width: '100',
            height: '100',
            fullScreen: false,
        };
        expect(() => { new iframe_1.AccountDisclosuresIframe(testAccountDisclosuresParams); }).toThrow(Error);
    });
    test('a new iframe is created when passed props', () => {
        const testAccountDisclosuresParams = {
            token: '123456',
            container,
            accountId: '123456',
            domain: 'test',
            width: '100',
            height: '100',
            fullScreen: false,
        };
        const accountDisclosures = new iframe_1.AccountDisclosuresIframe(testAccountDisclosuresParams);
        expect(container.firstChild).toBe(accountDisclosures.iframe);
    });
    test('fullscreen styles are added if fullScreen param is true', () => {
        const testAccountDisclosuresParams = {
            token: '123456',
            container,
            accountId: '123456',
            domain: 'test',
            width: '100',
            height: '150',
            fullScreen: true,
        };
        const accountDisclosures = new iframe_1.AccountDisclosuresIframe(testAccountDisclosuresParams);
        expect(accountDisclosures.iframe.style['z-index']).toBe("100000");
    });
});
//# sourceMappingURL=iframe.spec.js.map