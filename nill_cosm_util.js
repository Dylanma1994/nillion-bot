const { Writer, Reader } = require('protobufjs/minimal');

function unpack(y) {
    return Uint8Array.from(y.match(/.{1,2}/g).map(C => parseInt(C, 16)))
}

function createBaseRetailTokenMessage() {
    return {
        kind: 0,
        payload: new Uint8Array(0)
    }
}
const RetailTokenMessage = {
    encode(y, C=new BinaryWriter) {
        return y.kind !== 0 && C.uint32(8).int32(y.kind),
        y.payload.length !== 0 && C.uint32(18).bytes(y.payload),
        C
    },
    decode(y, C) {
        const E = y instanceof BinaryReader ? y : new BinaryReader(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseRetailTokenMessage();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 8)
                    break;
                ae.kind = E.int32();
                continue;
            case 2:
                if (_e !== 18)
                    break;
                ae.payload = E.bytes();
                continue
            }
            if ((_e & 7) === 4 || _e === 0)
                break;
            E.skip(_e & 7)
        }
        return ae
    },
    fromJSON(y) {
        return {
            kind: isSet(y.kind) ? retailTokenMessageTypeFromJSON(y.kind) : 0,
            payload: isSet(y.payload) ? bytesFromBase64(y.payload) : new Uint8Array(0)
        }
    },
    toJSON(y) {
        const C = {};
        return y.kind !== 0 && (C.kind = retailTokenMessageTypeToJSON(y.kind)),
        y.payload.length !== 0 && (C.payload = base64FromBytes(y.payload)),
        C
    },
    create(y) {
        return RetailTokenMessage.fromPartial(y ?? {})
    },
    fromPartial(y) {
        const C = createBaseRetailTokenMessage();
        return C.kind = y.kind ?? 0,
        C.payload = y.payload ?? new Uint8Array(0),
        C
    }
};
function createBaseAccuserId() {
    return {
        id: new Uint8Array(0)
    }
}
const AccuserId = {
    encode(y, C=new BinaryWriter) {
        return y.id.length !== 0 && C.uint32(10).bytes(y.id),
        C
    },
    decode(y, C) {
        const E = y instanceof BinaryReader ? y : new BinaryReader(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseAccuserId();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 10)
                    break;
                ae.id = E.bytes();
                continue
            }
            if ((_e & 7) === 4 || _e === 0)
                break;
            E.skip(_e & 7)
        }
        return ae
    },
    fromJSON(y) {
        return {
            id: isSet(y.id) ? bytesFromBase64(y.id) : new Uint8Array(0)
        }
    },
    toJSON(y) {
        const C = {};
        return y.id.length !== 0 && (C.id = base64FromBytes(y.id)),
        C
    },
    create(y) {
        return AccuserId.fromPartial(y ?? {})
    },
    fromPartial(y) {
        const C = createBaseAccuserId();
        return C.id = y.id ?? new Uint8Array(0),
        C
    }
};
function createBaseUserId() {
    return {
        id: new Uint8Array(0)
    }
}
const UserId = {
    encode(y, C=new BinaryWriter) {
        return y.id.length !== 0 && C.uint32(10).bytes(y.id),
        C
    },
    decode(y, C) {
        const E = y instanceof BinaryReader ? y : new BinaryReader(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseUserId();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 10)
                    break;
                ae.id = E.bytes();
                continue
            }
            if ((_e & 7) === 4 || _e === 0)
                break;
            E.skip(_e & 7)
        }
        return ae
    },
    fromJSON(y) {
        return {
            id: isSet(y.id) ? bytesFromBase64(y.id) : new Uint8Array(0)
        }
    },
    toJSON(y) {
        const C = {};
        return y.id.length !== 0 && (C.id = base64FromBytes(y.id)),
        C
    },
    create(y) {
        return UserId.fromPartial(y ?? {})
    },
    fromPartial(y) {
        const C = createBaseUserId();
        return C.id = y.id ?? new Uint8Array(0),
        C
    }
};
function createBaseSignature() {
    return {
        signature: new Uint8Array(0)
    }
}
const Signature = {
    encode(y, C=new BinaryWriter) {
        return y.signature.length !== 0 && C.uint32(10).bytes(y.signature),
        C
    },
    decode(y, C) {
        const E = y instanceof BinaryReader ? y : new BinaryReader(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseSignature();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 10)
                    break;
                ae.signature = E.bytes();
                continue
            }
            if ((_e & 7) === 4 || _e === 0)
                break;
            E.skip(_e & 7)
        }
        return ae
    },
    fromJSON(y) {
        return {
            signature: isSet(y.signature) ? bytesFromBase64(y.signature) : new Uint8Array(0)
        }
    },
    toJSON(y) {
        const C = {};
        return y.signature.length !== 0 && (C.signature = base64FromBytes(y.signature)),
        C
    },
    create(y) {
        return Signature.fromPartial(y ?? {})
    },
    fromPartial(y) {
        const C = createBaseSignature();
        return C.signature = y.signature ?? new Uint8Array(0),
        C
    }
};
function createBaseAccusationRegistrationMessage() {
    return {
        accuserId: void 0,
        userId: void 0,
        signature: void 0
    }
}
var WireType;
(function(y) {
    y[y.Varint = 0] = "Varint",
    y[y.Bit64 = 1] = "Bit64",
    y[y.LengthDelimited = 2] = "LengthDelimited",
    y[y.StartGroup = 3] = "StartGroup",
    y[y.EndGroup = 4] = "EndGroup",
    y[y.Bit32 = 5] = "Bit32"
}
)(WireType || (WireType = {}));
class BinaryWriter {
    constructor(C=getTextEncoding().encodeUtf8) {
        this.encodeUtf8 = C,
        this.stack = [],
        this.chunks = [],
        this.buf = []
    }
    finish() {
        this.chunks.push(new Uint8Array(this.buf));
        let C = 0;
        for (let ae = 0; ae < this.chunks.length; ae++)
            C += this.chunks[ae].length;
        let E = new Uint8Array(C)
          , L = 0;
        for (let ae = 0; ae < this.chunks.length; ae++)
            E.set(this.chunks[ae], L),
            L += this.chunks[ae].length;
        return this.chunks = [],
        E
    }
    fork() {
        return this.stack.push({
            chunks: this.chunks,
            buf: this.buf
        }),
        this.chunks = [],
        this.buf = [],
        this
    }
    join() {
        let C = this.finish()
          , E = this.stack.pop();
        if (!E)
            throw new Error("invalid state, fork stack empty");
        return this.chunks = E.chunks,
        this.buf = E.buf,
        this.uint32(C.byteLength),
        this.raw(C)
    }
    tag(C, E) {
        return this.uint32((C << 3 | E) >>> 0)
    }
    raw(C) {
        return this.buf.length && (this.chunks.push(new Uint8Array(this.buf)),
        this.buf = []),
        this.chunks.push(C),
        this
    }
    uint32(C) {
        for (assertUInt32(C); C > 127; )
            this.buf.push(C & 127 | 128),
            C = C >>> 7;
        return this.buf.push(C),
        this
    }
    int32(C) {
        return assertInt32(C),
        varint32write(C, this.buf),
        this
    }
    bool(C) {
        return this.buf.push(C ? 1 : 0),
        this
    }
    bytes(C) {
        return this.uint32(C.byteLength),
        this.raw(C)
    }
    string(C) {
        let E = this.encodeUtf8(C);
        return this.uint32(E.byteLength),
        this.raw(E)
    }
    float(C) {
        assertFloat32(C);
        let E = new Uint8Array(4);
        return new DataView(E.buffer).setFloat32(0, C, !0),
        this.raw(E)
    }
    double(C) {
        let E = new Uint8Array(8);
        return new DataView(E.buffer).setFloat64(0, C, !0),
        this.raw(E)
    }
    fixed32(C) {
        assertUInt32(C);
        let E = new Uint8Array(4);
        return new DataView(E.buffer).setUint32(0, C, !0),
        this.raw(E)
    }
    sfixed32(C) {
        assertInt32(C);
        let E = new Uint8Array(4);
        return new DataView(E.buffer).setInt32(0, C, !0),
        this.raw(E)
    }
    sint32(C) {
        return assertInt32(C),
        C = (C << 1 ^ C >> 31) >>> 0,
        varint32write(C, this.buf),
        this
    }
    sfixed64(C) {
        let E = new Uint8Array(8)
          , L = new DataView(E.buffer)
          , ae = protoInt64.enc(C);
        return L.setInt32(0, ae.lo, !0),
        L.setInt32(4, ae.hi, !0),
        this.raw(E)
    }
    fixed64(C) {
        let E = new Uint8Array(8)
          , L = new DataView(E.buffer)
          , ae = protoInt64.uEnc(C);
        return L.setInt32(0, ae.lo, !0),
        L.setInt32(4, ae.hi, !0),
        this.raw(E)
    }
    int64(C) {
        let E = protoInt64.enc(C);
        return varint64write(E.lo, E.hi, this.buf),
        this
    }
    sint64(C) {
        let E = protoInt64.enc(C)
          , L = E.hi >> 31
          , ae = E.lo << 1 ^ L
          , _e = (E.hi << 1 | E.lo >>> 31) ^ L;
        return varint64write(ae, _e, this.buf),
        this
    }
    uint64(C) {
        let E = protoInt64.uEnc(C);
        return varint64write(E.lo, E.hi, this.buf),
        this
    }
}
const symbol = Symbol.for("@bufbuild/protobuf/text-encoding");
class BinaryReader {
    constructor(C, E=getTextEncoding().decodeUtf8) {
        this.decodeUtf8 = E,
        this.varint64 = varint64read,
        this.uint32 = varint32read,
        this.buf = C,
        this.len = C.length,
        this.pos = 0,
        this.view = new DataView(C.buffer,C.byteOffset,C.byteLength)
    }
    tag() {
        let C = this.uint32()
          , E = C >>> 3
          , L = C & 7;
        if (E <= 0 || L < 0 || L > 5)
            throw new Error("illegal tag: field no " + E + " wire type " + L);
        return [E, L]
    }
    skip(C, E) {
        let L = this.pos;
        switch (C) {
        case WireType.Varint:
            for (; this.buf[this.pos++] & 128; )
                ;
            break;
        case WireType.Bit64:
            this.pos += 4;
        case WireType.Bit32:
            this.pos += 4;
            break;
        case WireType.LengthDelimited:
            let ae = this.uint32();
            this.pos += ae;
            break;
        case WireType.StartGroup:
            for (; ; ) {
                const [_e,Be] = this.tag();
                if (Be === WireType.EndGroup) {
                    if (E !== void 0 && _e !== E)
                        throw new Error("invalid end group tag");
                    break
                }
                this.skip(Be, _e)
            }
            break;
        default:
            throw new Error("cant skip wire type " + C)
        }
        return this.assertBounds(),
        this.buf.subarray(L, this.pos)
    }
    assertBounds() {
        if (this.pos > this.len)
            throw new RangeError("premature EOF")
    }
    int32() {
        return this.uint32() | 0
    }
    sint32() {
        let C = this.uint32();
        return C >>> 1 ^ -(C & 1)
    }
    int64() {
        return protoInt64.dec(...this.varint64())
    }
    uint64() {
        return protoInt64.uDec(...this.varint64())
    }
    sint64() {
        let[C,E] = this.varint64()
          , L = -(C & 1);
        return C = (C >>> 1 | (E & 1) << 31) ^ L,
        E = E >>> 1 ^ L,
        protoInt64.dec(C, E)
    }
    bool() {
        let[C,E] = this.varint64();
        return C !== 0 || E !== 0
    }
    fixed32() {
        return this.view.getUint32((this.pos += 4) - 4, !0)
    }
    sfixed32() {
        return this.view.getInt32((this.pos += 4) - 4, !0)
    }
    fixed64() {
        return protoInt64.uDec(this.sfixed32(), this.sfixed32())
    }
    sfixed64() {
        return protoInt64.dec(this.sfixed32(), this.sfixed32())
    }
    float() {
        return this.view.getFloat32((this.pos += 4) - 4, !0)
    }
    double() {
        return this.view.getFloat64((this.pos += 8) - 8, !0)
    }
    bytes() {
        let C = this.uint32()
          , E = this.pos;
        return this.pos += C,
        this.assertBounds(),
        this.buf.subarray(E, E + C)
    }
    string() {
        return this.decodeUtf8(this.bytes())
    }
}
const AccusationRegistrationMessage = {
    encode(y, C=new BinaryWriter) {
        return y.accuserId !== void 0 && AccuserId.encode(y.accuserId, C.uint32(10).fork()).join(),
        y.userId !== void 0 && UserId.encode(y.userId, C.uint32(18).fork()).join(),
        y.signature !== void 0 && Signature.encode(y.signature, C.uint32(26).fork()).join(),
        C
    },
    decode(y, C) {
        const E = y instanceof BinaryReader ? y : new BinaryReader(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseAccusationRegistrationMessage();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 10)
                    break;
                ae.accuserId = AccuserId.decode(E, E.uint32());
                continue;
            case 2:
                if (_e !== 18)
                    break;
                ae.userId = UserId.decode(E, E.uint32());
                continue;
            case 3:
                if (_e !== 26)
                    break;
                ae.signature = Signature.decode(E, E.uint32());
                continue
            }
            if ((_e & 7) === 4 || _e === 0)
                break;
            E.skip(_e & 7)
        }
        return ae
    },
    fromJSON(y) {
        return {
            accuserId: isSet(y.accuserId) ? AccuserId.fromJSON(y.accuserId) : void 0,
            userId: isSet(y.userId) ? UserId.fromJSON(y.userId) : void 0,
            signature: isSet(y.signature) ? Signature.fromJSON(y.signature) : void 0
        }
    },
    toJSON(y) {
        const C = {};
        return y.accuserId !== void 0 && (C.accuserId = AccuserId.toJSON(y.accuserId)),
        y.userId !== void 0 && (C.userId = UserId.toJSON(y.userId)),
        y.signature !== void 0 && (C.signature = Signature.toJSON(y.signature)),
        C
    },
    create(y) {
        return AccusationRegistrationMessage.fromPartial(y ?? {})
    },
    fromPartial(y) {
        const C = createBaseAccusationRegistrationMessage();
        return C.accuserId = y.accuserId !== void 0 && y.accuserId !== null ? AccuserId.fromPartial(y.accuserId) : void 0,
        C.userId = y.userId !== void 0 && y.userId !== null ? UserId.fromPartial(y.userId) : void 0,
        C.signature = y.signature !== void 0 && y.signature !== null ? Signature.fromPartial(y.signature) : void 0,
        C
    }
};
function bytesFromBase64(y) {
    if (globalThis.Buffer)
        return Uint8Array.from(globalThis.Buffer.from(y, "base64"));
    {
        const C = globalThis.atob(y)
          , E = new Uint8Array(C.length);
        for (let L = 0; L < C.length; ++L)
            E[L] = C.charCodeAt(L);
        return E
    }
}
function base64FromBytes(y) {
    if (globalThis.Buffer)
        return globalThis.Buffer.from(y).toString("base64");
    {
        const C = [];
        return y.forEach(E => {
            C.push(globalThis.String.fromCharCode(E))
        }
        ),
        globalThis.btoa(C.join(""))
    }
}
function getTextEncoding() {
    if (globalThis[symbol] == null) {
        const y = new globalThis.TextEncoder
          , C = new globalThis.TextDecoder;
        globalThis[symbol] = {
            encodeUtf8(E) {
                return y.encode(E)
            },
            decodeUtf8(E) {
                return C.decode(E)
            },
            checkUtf8(E) {
                try {
                    return encodeURIComponent(E),
                    !0
                } catch {
                    return !1
                }
            }
        }
    }
    return globalThis[symbol]
}
function varint32write(y, C) {
    if (y >= 0) {
        for (; y > 127; )
            C.push(y & 127 | 128),
            y = y >>> 7;
        C.push(y)
    } else {
        for (let E = 0; E < 9; E++)
            C.push(y & 127 | 128),
            y = y >> 7;
        C.push(1)
    }
}
function varint32read() {
    let y = this.buf[this.pos++]
      , C = y & 127;
    if (!(y & 128))
        return this.assertBounds(),
        C;
    if (y = this.buf[this.pos++],
    C |= (y & 127) << 7,
    !(y & 128))
        return this.assertBounds(),
        C;
    if (y = this.buf[this.pos++],
    C |= (y & 127) << 14,
    !(y & 128))
        return this.assertBounds(),
        C;
    if (y = this.buf[this.pos++],
    C |= (y & 127) << 21,
    !(y & 128))
        return this.assertBounds(),
        C;
    y = this.buf[this.pos++],
    C |= (y & 15) << 28;
    for (let E = 5; y & 128 && E < 10; E++)
        y = this.buf[this.pos++];
    if (y & 128)
        throw new Error("invalid varint");
    return this.assertBounds(),
    C >>> 0
}
const FLOAT32_MAX = 34028234663852886e22
  , FLOAT32_MIN = -34028234663852886e22
  , UINT32_MAX = 4294967295
  , INT32_MAX = 2147483647
  , INT32_MIN = -2147483648;
function assertInt32(y) {
    if (typeof y == "string")
        y = Number(y);
    else if (typeof y != "number")
        throw new Error("invalid int32: " + typeof y);
    if (!Number.isInteger(y) || y > INT32_MAX || y < INT32_MIN)
        throw new Error("invalid int32: " + y)
}
function assertUInt32(y) {
    if (typeof y == "string")
        y = Number(y);
    else if (typeof y != "number")
        throw new Error("invalid uint32: " + typeof y);
    if (!Number.isInteger(y) || y > UINT32_MAX || y < 0)
        throw new Error("invalid uint32: " + y)
}
function assertFloat32(y) {
    if (typeof y == "string") {
        const C = y;
        if (y = Number(y),
        isNaN(y) && C !== "NaN")
            throw new Error("invalid float32: " + C)
    } else if (typeof y != "number")
        throw new Error("invalid float32: " + typeof y);
    if (Number.isFinite(y) && (y > FLOAT32_MAX || y < FLOAT32_MIN))
        throw new Error("invalid float32: " + y)
}
const Amount = {
    encode(y) {
        let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Writer.create();
        return y.denom !== "" && C.uint32(10).string(y.denom),
        y.amount !== "" && C.uint32(18).string(y.amount),
        C
    },
    decode(y, C) {
        const E = y instanceof Reader ? y : Reader.create(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseAmount();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 10)
                    break;
                ae.denom = E.string();
                continue;
            case 2:
                if (_e !== 18)
                    break;
                ae.amount = E.string();
                continue
            }
            if ((7 & _e) == 4 || _e === 0)
                break;
            E.skipType(7 & _e)
        }
        return ae
    },
    fromJSON: y => ({
        denom: isSet(y.denom) ? globalThis.String(y.denom) : "",
        amount: isSet(y.amount) ? globalThis.String(y.amount) : ""
    }),
    toJSON(y) {
        const C = {};
        return y.denom !== "" && (C.denom = y.denom),
        y.amount !== "" && (C.amount = y.amount),
        C
    },
    create: y => Amount.fromPartial(y ?? {}),
    fromPartial(y) {
        const C = createBaseAmount();
        return C.denom = y.denom ?? "",
        C.amount = y.amount ?? "",
        C
    }
}
function createBaseAmount() {
    return {
        denom: "",
        amount: ""
    }
}
const MsgPayFor = {
    encode(y) {
        let C = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Writer.create();
        y.resource.length !== 0 && C.uint32(10).bytes(y.resource),
        y.fromAddress !== "" && C.uint32(18).string(y.fromAddress);
        for (const E of y.amount)
            Amount.encode(E, C.uint32(26).fork()).ldelim();
        return C
    },
    decode(y, C) {
        const E = y instanceof Reader ? y : Reader.create(y);
        let L = C === void 0 ? E.len : E.pos + C;
        const ae = createBaseMsgPayFor();
        for (; E.pos < L; ) {
            const _e = E.uint32();
            switch (_e >>> 3) {
            case 1:
                if (_e !== 10)
                    break;
                ae.resource = E.bytes();
                continue;
            case 2:
                if (_e !== 18)
                    break;
                ae.fromAddress = E.string();
                continue;
            case 3:
                if (_e !== 26)
                    break;
                ae.amount.push(Amount.decode(E, E.uint32()));
                continue
            }
            if ((7 & _e) == 4 || _e === 0)
                break;
            E.skipType(7 & _e)
        }
        return ae
    },
    fromJSON: y => ({
        resource: isSet(y.resource) ? bytesFromBase64(y.resource) : new Uint8Array(0),
        fromAddress: isSet(y.fromAddress) ? globalThis.String(y.fromAddress) : "",
        amount: globalThis.Array.isArray(y?.amount) ? y.amount.map(C => Amount.fromJSON(C)) : []
    }),
    toJSON(y) {
        const C = {};
        return y.resource.length !== 0 && (C.resource = base64FromBytes(y.resource)),
        y.fromAddress !== "" && (C.fromAddress = y.fromAddress),
        y.amount?.length && (C.amount = y.amount.map(E => Amount.toJSON(E))),
        C
    },
    create: y => MsgPayFor.fromPartial(y ?? {}),
    fromPartial(y) {
        const C = createBaseMsgPayFor();
        return C.resource = y.resource ?? new Uint8Array(0),
        C.fromAddress = y.fromAddress ?? "",
        C.amount = y.amount?.map(E => Amount.fromPartial(E)) || [],
        C
    }
}
function bytesFromBase64(y) {
    if (globalThis.Buffer)
        return Uint8Array.from(globalThis.Buffer.from(y, "base64"));
    {
        const C = globalThis.atob(y)
          , E = new Uint8Array(C.length);
        for (let L = 0; L < C.length; ++L)
            E[L] = C.charCodeAt(L);
        return E
    }
}
function base64FromBytes(y) {
    if (globalThis.Buffer)
        return globalThis.Buffer.from(y).toString("base64");
    {
        const C = [];
        return y.forEach(E => {
            C.push(globalThis.String.fromCharCode(E))
        }
        ),
        globalThis.btoa(C.join(""))
    }
}
function isSet(y) {
    return y != null
}
function createBaseMsgPayFor() {
    return {
        resource: new Uint8Array(0),
        fromAddress: "",
        amount: []
    }
}

module.exports = {
    unpack,
    RetailTokenMessage,
    AccuserId,
    UserId,
    Signature,
    Amount,
    MsgPayFor,
    AccusationRegistrationMessage,
    BinaryReader,
    BinaryWriter
}