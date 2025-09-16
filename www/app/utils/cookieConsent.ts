/**
 * Cookie consent utility functions
 * Handles localStorage-based cookie consent management
 */

export interface CookieConsent {
    accepted: boolean;
    timestamp: number;
    version: string;
}

const COOKIE_CONSENT_KEY = 'jangoro_cookie_consent';
const COOKIE_CONSENT_VERSION = '1.0';

/**
 * Get cookie consent status from localStorage
 * @returns CookieConsent object or null if not set
 */
export function getCookieConsent(): CookieConsent | null {
    if (typeof window === 'undefined') {
        return null;
    }

    try {
        const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!stored) {
            return null;
        }

        const consent: CookieConsent = JSON.parse(stored);

        // Check if consent is valid (not expired and correct version)
        if (consent.version === COOKIE_CONSENT_VERSION && consent.accepted) {
            return consent;
        }

        return null;
    } catch (error) {
        console.warn('Failed to parse cookie consent from localStorage:', error);
        return null;
    }
}

/**
 * Set cookie consent in localStorage
 * @param accepted - Whether cookies are accepted
 */
export function setCookieConsent(accepted: boolean): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        const consent: CookieConsent = {
            accepted,
            timestamp: Date.now(),
            version: COOKIE_CONSENT_VERSION,
        };

        localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    } catch (error) {
        console.warn('Failed to save cookie consent to localStorage:', error);
    }
}

/**
 * Check if cookies have been accepted
 * @returns boolean indicating if cookies are accepted
 */
export function hasAcceptedCookies(): boolean {
    const consent = getCookieConsent();
    return consent?.accepted === true;
}

/**
 * Clear cookie consent from localStorage
 */
export function clearCookieConsent(): void {
    if (typeof window === 'undefined') {
        return;
    }

    try {
        localStorage.removeItem(COOKIE_CONSENT_KEY);
    } catch (error) {
        console.warn('Failed to clear cookie consent from localStorage:', error);
    }
}

/**
 * Initialize cookie consent on page load
 * This should be called in the root component or layout
 * @returns boolean indicating if cookies were previously accepted
 */
export function initializeCookieConsent(): boolean {
    return hasAcceptedCookies();
}
