const { Buffer } = require('buffer');
const fs = require('fs');
const path = require('path');

let wasm$1;
const heap = new Array(128).fill(void 0);
heap.push(void 0, null, !0, !1);
function getObject(y) {
    return heap[y]
}
let heap_next = heap.length;
function dropObject(y) {
    y < 132 || (heap[y] = heap_next,
    heap_next = y)
}
function takeObject(y) {
    const C = getObject(y);
    return dropObject(y),
    C
}
const cachedTextDecoder = typeof TextDecoder < "u" ? new TextDecoder("utf-8",{
    ignoreBOM: !0,
    fatal: !0
}) : {
    decode: () => {
        throw Error("TextDecoder not available")
    }
};
typeof TextDecoder < "u" && cachedTextDecoder.decode();
let cachedUint8Memory0 = null;
function getUint8Memory0() {
    return (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) && (cachedUint8Memory0 = new Uint8Array(wasm$1.memory.buffer)),
    cachedUint8Memory0
}
function getStringFromWasm0(y, C) {
    return y = y >>> 0,
    cachedTextDecoder.decode(getUint8Memory0().subarray(y, y + C))
}
function addHeapObject(y) {
    heap_next === heap.length && heap.push(heap.length + 1);
    const C = heap_next;
    return heap_next = heap[C],
    heap[C] = y,
    C
}
let WASM_VECTOR_LEN = 0;
function passArray8ToWasm0(y, C) {
    const E = C(y.length * 1, 1) >>> 0;
    return getUint8Memory0().set(y, E / 1),
    WASM_VECTOR_LEN = y.length,
    E
}
let cachedInt32Memory0 = null;
function getInt32Memory0() {
    return (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) && (cachedInt32Memory0 = new Int32Array(wasm$1.memory.buffer)),
    cachedInt32Memory0
}
function encrypt(y, C) {
    try {
        const _e = wasm$1.__wbindgen_add_to_stack_pointer(-16)
          , Be = passArray8ToWasm0(y, wasm$1.__wbindgen_malloc)
          , Pe = WASM_VECTOR_LEN
          , Ne = passArray8ToWasm0(C, wasm$1.__wbindgen_malloc)
          , Fe = WASM_VECTOR_LEN;
        wasm$1.encrypt(_e, Be, Pe, Ne, Fe);
        var E = getInt32Memory0()[_e / 4 + 0]
          , L = getInt32Memory0()[_e / 4 + 1]
          , ae = getInt32Memory0()[_e / 4 + 2];
        if (ae)
            throw takeObject(L);
        return takeObject(E)
    } finally {
        wasm$1.__wbindgen_add_to_stack_pointer(16)
    }
}
function handleError(y, C) {
    try {
        return y.apply(this, C)
    } catch (E) {
        wasm$1.__wbindgen_exn_store(addHeapObject(E))
    }
}
async function __wbg_load(y, C) {
    if (typeof Response == "function" && y instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming == "function")
            try {
                return await WebAssembly.instantiateStreaming(y, C)
            } catch (L) {
                if (y.headers.get("Content-Type") != "application/wasm")
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", L);
                else
                    throw L
            }
        const E = await y.arrayBuffer();
        return await WebAssembly.instantiate(E, C)
    } else {
        const E = await WebAssembly.instantiate(y, C);
        return E instanceof WebAssembly.Instance ? {
            instance: E,
            module: y
        } : E
    }
}
function __wbg_get_imports() {
    const y = {};
    return y.wbg = {},
    y.wbg.__wbindgen_object_drop_ref = function(C) {
        takeObject(C)
    }
    ,
    y.wbg.__wbindgen_error_new = function(C, E) {
        const L = new Error(getStringFromWasm0(C, E));
        return addHeapObject(L)
    }
    ,
    y.wbg.__wbindgen_is_object = function(C) {
        const E = getObject(C);
        return typeof E == "object" && E !== null
    }
    ,
    y.wbg.__wbg_crypto_c48a774b022d20ac = function(C) {
        const E = getObject(C).crypto;
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_process_298734cf255a885d = function(C) {
        const E = getObject(C).process;
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_versions_e2e78e134e3e5d01 = function(C) {
        const E = getObject(C).versions;
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_node_1cd7a5d853dbea79 = function(C) {
        const E = getObject(C).node;
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbindgen_is_string = function(C) {
        return typeof getObject(C) == "string"
    }
    ,
    y.wbg.__wbg_require_8f08ceecec0f4fee = function() {
        return handleError(function() {
            const C = module.require;
            return addHeapObject(C)
        }, arguments)
    }
    ,
    y.wbg.__wbindgen_string_new = function(C, E) {
        const L = getStringFromWasm0(C, E);
        return addHeapObject(L)
    }
    ,
    y.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function(C) {
        const E = getObject(C).msCrypto;
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function() {
        return handleError(function(C, E) {
            getObject(C).getRandomValues(getObject(E))
        }, arguments)
    }
    ,
    y.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function() {
        return handleError(function(C, E) {
            getObject(C).randomFillSync(takeObject(E))
        }, arguments)
    }
    ,
    y.wbg.__wbg_new_898a68150f225f2e = function() {
        const C = new Array;
        return addHeapObject(C)
    }
    ,
    y.wbg.__wbg_newnoargs_581967eacc0e2604 = function(C, E) {
        const L = new Function(getStringFromWasm0(C, E));
        return addHeapObject(L)
    }
    ,
    y.wbg.__wbindgen_is_function = function(C) {
        return typeof getObject(C) == "function"
    }
    ,
    y.wbg.__wbg_self_1ff1d729e9aae938 = function() {
        return handleError(function() {
            const C = self.self;
            return addHeapObject(C)
        }, arguments)
    }
    ,
    y.wbg.__wbg_window_5f4faef6c12b79ec = function() {
        return handleError(function() {
            const C = window.window;
            return addHeapObject(C)
        }, arguments)
    }
    ,
    y.wbg.__wbg_globalThis_1d39714405582d3c = function() {
        return handleError(function() {
            const C = globalThis.globalThis;
            return addHeapObject(C)
        }, arguments)
    }
    ,
    y.wbg.__wbg_global_651f05c6a0944d1c = function() {
        return handleError(function() {
            const C = global.global;
            return addHeapObject(C)
        }, arguments)
    }
    ,
    y.wbg.__wbindgen_is_undefined = function(C) {
        return getObject(C) === void 0
    }
    ,
    y.wbg.__wbg_push_ca1c26067ef907ac = function(C, E) {
        return getObject(C).push(getObject(E))
    }
    ,
    y.wbg.__wbg_call_cb65541d95d71282 = function() {
        return handleError(function(C, E) {
            const L = getObject(C).call(getObject(E));
            return addHeapObject(L)
        }, arguments)
    }
    ,
    y.wbg.__wbg_call_01734de55d61e11d = function() {
        return handleError(function(C, E, L) {
            const ae = getObject(C).call(getObject(E), getObject(L));
            return addHeapObject(ae)
        }, arguments)
    }
    ,
    y.wbg.__wbg_buffer_085ec1f694018c4f = function(C) {
        const E = getObject(C).buffer;
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function(C, E, L) {
        const ae = new Uint8Array(getObject(C),E >>> 0,L >>> 0);
        return addHeapObject(ae)
    }
    ,
    y.wbg.__wbg_new_8125e318e6245eed = function(C) {
        const E = new Uint8Array(getObject(C));
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function(C) {
        const E = new Uint8Array(C >>> 0);
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbg_subarray_13db269f57aa838d = function(C, E, L) {
        const ae = getObject(C).subarray(E >>> 0, L >>> 0);
        return addHeapObject(ae)
    }
    ,
    y.wbg.__wbg_set_5cf90238115182c3 = function(C, E, L) {
        getObject(C).set(getObject(E), L >>> 0)
    }
    ,
    y.wbg.__wbindgen_object_clone_ref = function(C) {
        const E = getObject(C);
        return addHeapObject(E)
    }
    ,
    y.wbg.__wbindgen_throw = function(C, E) {
        throw new Error(getStringFromWasm0(C, E))
    }
    ,
    y.wbg.__wbindgen_memory = function() {
        const C = wasm$1.memory;
        return addHeapObject(C)
    }
    ,
    y
}
function __wbg_finalize_init(y, C) {
    return wasm$1 = y.exports,
    __wbg_init.__wbindgen_wasm_module = C,
    cachedInt32Memory0 = null,
    cachedUint8Memory0 = null,
    wasm$1
}
async function __wbg_init(y) {
    if (wasm$1 !== void 0)
        return wasm$1;
    // if (!fetch) {
    //     await initFetch();
    // }
    // typeof y > "u" && (y = new URL("file:///Users/dylan/Code/node-sample/ecies_wasm_bg.C3m4Ov0u.wasm"));
    // const C = __wbg_get_imports();
    // (typeof y == "string" || typeof Request == "function" && y instanceof Request || typeof URL == "function" && y instanceof URL) && (y = fetch(y));
    // const {instance: E, module: L} = await __wbg_load(await y, C);
    // return __wbg_finalize_init(E, L)

    // 直接读取 WASM 文件
    const wasmPath = path.resolve(__dirname, './ecies_wasm_bg.C3m4Ov0u.wasm');
    const wasmBuffer = fs.readFileSync(wasmPath);
    
    const C = __wbg_get_imports();
    
    // 编译和实例化 WASM 模块
    const wasmModule = await WebAssembly.compile(wasmBuffer);
    const instance = await WebAssembly.instantiate(wasmModule, C);
    
    return __wbg_finalize_init(instance, wasmModule);
}

module.exports = {
    __wbg_init,
    encrypt
}

// async function main() {
//     const wasmExports = await __wbg_init();
//     console.log(wasm$1)
//     console.log('--------')
//     console.log(wasmExports)
//     console.log('--------')
//     console.log(encrypt(
//         Buffer.from([3, 208, 99, 182, 160, 175, 71, 43, 79, 156, 7, 181, 39, 6, 62, 140, 80, 8, 187, 198, 125, 0, 105, 40, 205, 108, 174, 140, 164, 16, 87, 195, 27]),
//         Buffer.from([0, 0, 0, 0, 5, 5, 10, 0, 204, 0, 7, 0, 132, 220, 134, 34, 0, 0, 163, 246, 0, 0, 0])
//     ))
// }

// __wbg_init().then(console.error)
// sleep(1000)
// encrypt(1, 1)

// main()

// console.log(encrypt(1, 1))

// console.log(wasm$1)