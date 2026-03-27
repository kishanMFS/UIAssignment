import "@testing-library/jest-dom";

import { TextEncoder, TextDecoder } from "util";

(global as { TextEncoder: typeof TextEncoder }).TextEncoder = TextEncoder;
(global as { TextDecoder: typeof TextDecoder }).TextDecoder = TextDecoder;
