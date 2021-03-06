/**
 * License: zlib/libpng
 * @author Santo Pfingsten
 * @see https://github.com/Lusito/web-ext-translator
 */

import { State } from "../shared";
import { adjustAllHeights } from "../utils/adjustHeights";

export interface WetActionSelectLanguagePayload {
    first: boolean;
    locale: string | null;
}

export interface WetActionSelectLanguage {
    type: "SELECT_LANGUAGE";
    payload: WetActionSelectLanguagePayload;
}

export function handleSelectLanguage(state: State, payload: WetActionSelectLanguagePayload): State {
    if (!state.extension)
        return state;
    const extension = { ...state.extension };
    if (payload.locale && !extension.languages[payload.locale])
        return state;
    if (payload.first)
        extension.firstLocale = payload.locale;
    else
        extension.secondLocale = payload.locale;
    adjustAllHeights();
    return { ...state, extension };
}
