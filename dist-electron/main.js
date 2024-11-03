var Iu = Object.defineProperty;
var Ar = (e) => {
  throw TypeError(e);
};
var Cu = (e, t, n) => t in e ? Iu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var nn = (e, t, n) => Cu(e, typeof t != "symbol" ? t + "" : t, n), Ir = (e, t, n) => t.has(e) || Ar("Cannot " + n);
var re = (e, t, n) => (Ir(e, t, "read from private field"), n ? n.call(e) : t.get(e)), an = (e, t, n) => t.has(e) ? Ar("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), sn = (e, t, n, a) => (Ir(e, t, "write to private field"), a ? a.call(e, n) : t.set(e, n), n);
import Lu, { ipcMain as ee, app as Je, shell as Zs, BrowserWindow as Kt, dialog as Du } from "electron";
import { fileURLToPath as Fu } from "node:url";
import J from "node:path";
import de from "fs";
import Te, { dirname as _c } from "path";
import Ec from "os";
import zu from "crypto";
import _n, { TextEncoder as Uu } from "util";
import Le, { Readable as qu } from "stream";
import Qs from "http";
import ei from "https";
import pa, { fileURLToPath as Sc } from "url";
import Mu from "assert";
import Rc from "tty";
import vt from "zlib";
import { EventEmitter as Vu } from "events";
import me from "node:process";
import { promisify as $e, isDeepStrictEqual as Bu } from "node:util";
import K from "node:fs";
import rn from "node:crypto";
import Hu from "node:assert";
import da from "node:os";
function En(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var st = { exports: {} };
const Gu = "dotenv", Ku = "16.4.5", Wu = "Loads environment variables from .env file", Xu = "lib/main.js", Ju = "lib/main.d.ts", Yu = {
  ".": {
    types: "./lib/main.d.ts",
    require: "./lib/main.js",
    default: "./lib/main.js"
  },
  "./config": "./config.js",
  "./config.js": "./config.js",
  "./lib/env-options": "./lib/env-options.js",
  "./lib/env-options.js": "./lib/env-options.js",
  "./lib/cli-options": "./lib/cli-options.js",
  "./lib/cli-options.js": "./lib/cli-options.js",
  "./package.json": "./package.json"
}, Zu = {
  "dts-check": "tsc --project tests/types/tsconfig.json",
  lint: "standard",
  "lint-readme": "standard-markdown",
  pretest: "npm run lint && npm run dts-check",
  test: "tap tests/*.js --100 -Rspec",
  "test:coverage": "tap --coverage-report=lcov",
  prerelease: "npm test",
  release: "standard-version"
}, Qu = {
  type: "git",
  url: "git://github.com/motdotla/dotenv.git"
}, ep = "https://dotenvx.com", tp = [
  "dotenv",
  "env",
  ".env",
  "environment",
  "variables",
  "config",
  "settings"
], np = "README.md", ap = "BSD-2-Clause", sp = {
  "@definitelytyped/dtslint": "^0.0.133",
  "@types/node": "^18.11.3",
  decache: "^4.6.1",
  sinon: "^14.0.1",
  standard: "^17.0.0",
  "standard-markdown": "^7.1.0",
  "standard-version": "^9.5.0",
  tap: "^16.3.0",
  tar: "^6.1.11",
  typescript: "^4.8.4"
}, ip = {
  node: ">=12"
}, rp = {
  fs: !1
}, op = {
  name: Gu,
  version: Ku,
  description: Wu,
  main: Xu,
  types: Ju,
  exports: Yu,
  scripts: Zu,
  repository: Qu,
  funding: ep,
  keywords: tp,
  readmeFilename: np,
  license: ap,
  devDependencies: sp,
  engines: ip,
  browser: rp
}, Rs = de, ti = Te, cp = Ec, lp = zu, up = op, ni = up.version, pp = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;
function dp(e) {
  const t = {};
  let n = e.toString();
  n = n.replace(/\r\n?/mg, `
`);
  let a;
  for (; (a = pp.exec(n)) != null; ) {
    const s = a[1];
    let i = a[2] || "";
    i = i.trim();
    const r = i[0];
    i = i.replace(/^(['"`])([\s\S]*)\1$/mg, "$2"), r === '"' && (i = i.replace(/\\n/g, `
`), i = i.replace(/\\r/g, "\r")), t[s] = i;
  }
  return t;
}
function mp(e) {
  const t = jc(e), n = fe.configDotenv({ path: t });
  if (!n.parsed) {
    const r = new Error(`MISSING_DATA: Cannot parse ${t} for an unknown reason`);
    throw r.code = "MISSING_DATA", r;
  }
  const a = kc(e).split(","), s = a.length;
  let i;
  for (let r = 0; r < s; r++)
    try {
      const l = a[r].trim(), c = vp(n, l);
      i = fe.decrypt(c.ciphertext, c.key);
      break;
    } catch (l) {
      if (r + 1 >= s)
        throw l;
    }
  return fe.parse(i);
}
function fp(e) {
  console.log(`[dotenv@${ni}][INFO] ${e}`);
}
function hp(e) {
  console.log(`[dotenv@${ni}][WARN] ${e}`);
}
function ta(e) {
  console.log(`[dotenv@${ni}][DEBUG] ${e}`);
}
function kc(e) {
  return e && e.DOTENV_KEY && e.DOTENV_KEY.length > 0 ? e.DOTENV_KEY : process.env.DOTENV_KEY && process.env.DOTENV_KEY.length > 0 ? process.env.DOTENV_KEY : "";
}
function vp(e, t) {
  let n;
  try {
    n = new URL(t);
  } catch (l) {
    if (l.code === "ERR_INVALID_URL") {
      const c = new Error("INVALID_DOTENV_KEY: Wrong format. Must be in valid uri format like dotenv://:key_1234@dotenvx.com/vault/.env.vault?environment=development");
      throw c.code = "INVALID_DOTENV_KEY", c;
    }
    throw l;
  }
  const a = n.password;
  if (!a) {
    const l = new Error("INVALID_DOTENV_KEY: Missing key part");
    throw l.code = "INVALID_DOTENV_KEY", l;
  }
  const s = n.searchParams.get("environment");
  if (!s) {
    const l = new Error("INVALID_DOTENV_KEY: Missing environment part");
    throw l.code = "INVALID_DOTENV_KEY", l;
  }
  const i = `DOTENV_VAULT_${s.toUpperCase()}`, r = e.parsed[i];
  if (!r) {
    const l = new Error(`NOT_FOUND_DOTENV_ENVIRONMENT: Cannot locate environment ${i} in your .env.vault file.`);
    throw l.code = "NOT_FOUND_DOTENV_ENVIRONMENT", l;
  }
  return { ciphertext: r, key: a };
}
function jc(e) {
  let t = null;
  if (e && e.path && e.path.length > 0)
    if (Array.isArray(e.path))
      for (const n of e.path)
        Rs.existsSync(n) && (t = n.endsWith(".vault") ? n : `${n}.vault`);
    else
      t = e.path.endsWith(".vault") ? e.path : `${e.path}.vault`;
  else
    t = ti.resolve(process.cwd(), ".env.vault");
  return Rs.existsSync(t) ? t : null;
}
function Cr(e) {
  return e[0] === "~" ? ti.join(cp.homedir(), e.slice(1)) : e;
}
function gp(e) {
  fp("Loading env from encrypted .env.vault");
  const t = fe._parseVault(e);
  let n = process.env;
  return e && e.processEnv != null && (n = e.processEnv), fe.populate(n, t, e), { parsed: t };
}
function xp(e) {
  const t = ti.resolve(process.cwd(), ".env");
  let n = "utf8";
  const a = !!(e && e.debug);
  e && e.encoding ? n = e.encoding : a && ta("No encoding is specified. UTF-8 is used by default");
  let s = [t];
  if (e && e.path)
    if (!Array.isArray(e.path))
      s = [Cr(e.path)];
    else {
      s = [];
      for (const c of e.path)
        s.push(Cr(c));
    }
  let i;
  const r = {};
  for (const c of s)
    try {
      const o = fe.parse(Rs.readFileSync(c, { encoding: n }));
      fe.populate(r, o, e);
    } catch (o) {
      a && ta(`Failed to load ${c} ${o.message}`), i = o;
    }
  let l = process.env;
  return e && e.processEnv != null && (l = e.processEnv), fe.populate(l, r, e), i ? { parsed: r, error: i } : { parsed: r };
}
function yp(e) {
  if (kc(e).length === 0)
    return fe.configDotenv(e);
  const t = jc(e);
  return t ? fe._configVault(e) : (hp(`You set DOTENV_KEY but you are missing a .env.vault file at ${t}. Did you forget to build it?`), fe.configDotenv(e));
}
function bp(e, t) {
  const n = Buffer.from(t.slice(-64), "hex");
  let a = Buffer.from(e, "base64");
  const s = a.subarray(0, 12), i = a.subarray(-16);
  a = a.subarray(12, -16);
  try {
    const r = lp.createDecipheriv("aes-256-gcm", n, s);
    return r.setAuthTag(i), `${r.update(a)}${r.final()}`;
  } catch (r) {
    const l = r instanceof RangeError, c = r.message === "Invalid key length", o = r.message === "Unsupported state or unable to authenticate data";
    if (l || c) {
      const u = new Error("INVALID_DOTENV_KEY: It must be 64 characters long (or more)");
      throw u.code = "INVALID_DOTENV_KEY", u;
    } else if (o) {
      const u = new Error("DECRYPTION_FAILED: Please check your DOTENV_KEY");
      throw u.code = "DECRYPTION_FAILED", u;
    } else
      throw r;
  }
}
function $p(e, t, n = {}) {
  const a = !!(n && n.debug), s = !!(n && n.override);
  if (typeof t != "object") {
    const i = new Error("OBJECT_REQUIRED: Please check the processEnv argument being passed to populate");
    throw i.code = "OBJECT_REQUIRED", i;
  }
  for (const i of Object.keys(t))
    Object.prototype.hasOwnProperty.call(e, i) ? (s === !0 && (e[i] = t[i]), a && ta(s === !0 ? `"${i}" is already defined and WAS overwritten` : `"${i}" is already defined and was NOT overwritten`)) : e[i] = t[i];
}
const fe = {
  configDotenv: xp,
  _configVault: gp,
  _parseVault: mp,
  config: yp,
  decrypt: bp,
  parse: dp,
  populate: $p
};
st.exports.configDotenv = fe.configDotenv;
st.exports._configVault = fe._configVault;
st.exports._parseVault = fe._parseVault;
st.exports.config = fe.config;
st.exports.decrypt = fe.decrypt;
st.exports.parse = fe.parse;
st.exports.populate = fe.populate;
st.exports = fe;
var wp = st.exports;
const _p = /* @__PURE__ */ En(wp);
function Tc(e, t) {
  return function() {
    return e.apply(t, arguments);
  };
}
const { toString: Ep } = Object.prototype, { getPrototypeOf: ai } = Object, ma = /* @__PURE__ */ ((e) => (t) => {
  const n = Ep.call(t);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), qe = (e) => (e = e.toLowerCase(), (t) => ma(t) === e), fa = (e) => (t) => typeof t === e, { isArray: Wt } = Array, yn = fa("undefined");
function Sp(e) {
  return e !== null && !yn(e) && e.constructor !== null && !yn(e.constructor) && Ae(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Oc = qe("ArrayBuffer");
function Rp(e) {
  let t;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? t = ArrayBuffer.isView(e) : t = e && e.buffer && Oc(e.buffer), t;
}
const kp = fa("string"), Ae = fa("function"), Pc = fa("number"), ha = (e) => e !== null && typeof e == "object", jp = (e) => e === !0 || e === !1, Kn = (e) => {
  if (ma(e) !== "object")
    return !1;
  const t = ai(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}, Tp = qe("Date"), Op = qe("File"), Pp = qe("Blob"), Np = qe("FileList"), Ap = (e) => ha(e) && Ae(e.pipe), Ip = (e) => {
  let t;
  return e && (typeof FormData == "function" && e instanceof FormData || Ae(e.append) && ((t = ma(e)) === "formdata" || // detect form-data instance
  t === "object" && Ae(e.toString) && e.toString() === "[object FormData]"));
}, Cp = qe("URLSearchParams"), [Lp, Dp, Fp, zp] = ["ReadableStream", "Request", "Response", "Headers"].map(qe), Up = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function Sn(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let a, s;
  if (typeof e != "object" && (e = [e]), Wt(e))
    for (a = 0, s = e.length; a < s; a++)
      t.call(null, e[a], a, e);
  else {
    const i = n ? Object.getOwnPropertyNames(e) : Object.keys(e), r = i.length;
    let l;
    for (a = 0; a < r; a++)
      l = i[a], t.call(null, e[l], l, e);
  }
}
function Nc(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let a = n.length, s;
  for (; a-- > 0; )
    if (s = n[a], t === s.toLowerCase())
      return s;
  return null;
}
const Et = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Ac = (e) => !yn(e) && e !== Et;
function ks() {
  const { caseless: e } = Ac(this) && this || {}, t = {}, n = (a, s) => {
    const i = e && Nc(t, s) || s;
    Kn(t[i]) && Kn(a) ? t[i] = ks(t[i], a) : Kn(a) ? t[i] = ks({}, a) : Wt(a) ? t[i] = a.slice() : t[i] = a;
  };
  for (let a = 0, s = arguments.length; a < s; a++)
    arguments[a] && Sn(arguments[a], n);
  return t;
}
const qp = (e, t, n, { allOwnKeys: a } = {}) => (Sn(t, (s, i) => {
  n && Ae(s) ? e[i] = Tc(s, n) : e[i] = s;
}, { allOwnKeys: a }), e), Mp = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), Vp = (e, t, n, a) => {
  e.prototype = Object.create(t.prototype, a), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: t.prototype
  }), n && Object.assign(e.prototype, n);
}, Bp = (e, t, n, a) => {
  let s, i, r;
  const l = {};
  if (t = t || {}, e == null) return t;
  do {
    for (s = Object.getOwnPropertyNames(e), i = s.length; i-- > 0; )
      r = s[i], (!a || a(r, e, t)) && !l[r] && (t[r] = e[r], l[r] = !0);
    e = n !== !1 && ai(e);
  } while (e && (!n || n(e, t)) && e !== Object.prototype);
  return t;
}, Hp = (e, t, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= t.length;
  const a = e.indexOf(t, n);
  return a !== -1 && a === n;
}, Gp = (e) => {
  if (!e) return null;
  if (Wt(e)) return e;
  let t = e.length;
  if (!Pc(t)) return null;
  const n = new Array(t);
  for (; t-- > 0; )
    n[t] = e[t];
  return n;
}, Kp = /* @__PURE__ */ ((e) => (t) => e && t instanceof e)(typeof Uint8Array < "u" && ai(Uint8Array)), Wp = (e, t) => {
  const a = (e && e[Symbol.iterator]).call(e);
  let s;
  for (; (s = a.next()) && !s.done; ) {
    const i = s.value;
    t.call(e, i[0], i[1]);
  }
}, Xp = (e, t) => {
  let n;
  const a = [];
  for (; (n = e.exec(t)) !== null; )
    a.push(n);
  return a;
}, Jp = qe("HTMLFormElement"), Yp = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, a, s) {
    return a.toUpperCase() + s;
  }
), Lr = (({ hasOwnProperty: e }) => (t, n) => e.call(t, n))(Object.prototype), Zp = qe("RegExp"), Ic = (e, t) => {
  const n = Object.getOwnPropertyDescriptors(e), a = {};
  Sn(n, (s, i) => {
    let r;
    (r = t(s, i, e)) !== !1 && (a[i] = r || s);
  }), Object.defineProperties(e, a);
}, Qp = (e) => {
  Ic(e, (t, n) => {
    if (Ae(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const a = e[n];
    if (Ae(a)) {
      if (t.enumerable = !1, "writable" in t) {
        t.writable = !1;
        return;
      }
      t.set || (t.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, ed = (e, t) => {
  const n = {}, a = (s) => {
    s.forEach((i) => {
      n[i] = !0;
    });
  };
  return Wt(e) ? a(e) : a(String(e).split(t)), n;
}, td = () => {
}, nd = (e, t) => e != null && Number.isFinite(e = +e) ? e : t, Qa = "abcdefghijklmnopqrstuvwxyz", Dr = "0123456789", Cc = {
  DIGIT: Dr,
  ALPHA: Qa,
  ALPHA_DIGIT: Qa + Qa.toUpperCase() + Dr
}, ad = (e = 16, t = Cc.ALPHA_DIGIT) => {
  let n = "";
  const { length: a } = t;
  for (; e--; )
    n += t[Math.random() * a | 0];
  return n;
};
function sd(e) {
  return !!(e && Ae(e.append) && e[Symbol.toStringTag] === "FormData" && e[Symbol.iterator]);
}
const id = (e) => {
  const t = new Array(10), n = (a, s) => {
    if (ha(a)) {
      if (t.indexOf(a) >= 0)
        return;
      if (!("toJSON" in a)) {
        t[s] = a;
        const i = Wt(a) ? [] : {};
        return Sn(a, (r, l) => {
          const c = n(r, s + 1);
          !yn(c) && (i[l] = c);
        }), t[s] = void 0, i;
      }
    }
    return a;
  };
  return n(e, 0);
}, rd = qe("AsyncFunction"), od = (e) => e && (ha(e) || Ae(e)) && Ae(e.then) && Ae(e.catch), Lc = ((e, t) => e ? setImmediate : t ? ((n, a) => (Et.addEventListener("message", ({ source: s, data: i }) => {
  s === Et && i === n && a.length && a.shift()();
}, !1), (s) => {
  a.push(s), Et.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  Ae(Et.postMessage)
), cd = typeof queueMicrotask < "u" ? queueMicrotask.bind(Et) : typeof process < "u" && process.nextTick || Lc, _ = {
  isArray: Wt,
  isArrayBuffer: Oc,
  isBuffer: Sp,
  isFormData: Ip,
  isArrayBufferView: Rp,
  isString: kp,
  isNumber: Pc,
  isBoolean: jp,
  isObject: ha,
  isPlainObject: Kn,
  isReadableStream: Lp,
  isRequest: Dp,
  isResponse: Fp,
  isHeaders: zp,
  isUndefined: yn,
  isDate: Tp,
  isFile: Op,
  isBlob: Pp,
  isRegExp: Zp,
  isFunction: Ae,
  isStream: Ap,
  isURLSearchParams: Cp,
  isTypedArray: Kp,
  isFileList: Np,
  forEach: Sn,
  merge: ks,
  extend: qp,
  trim: Up,
  stripBOM: Mp,
  inherits: Vp,
  toFlatObject: Bp,
  kindOf: ma,
  kindOfTest: qe,
  endsWith: Hp,
  toArray: Gp,
  forEachEntry: Wp,
  matchAll: Xp,
  isHTMLForm: Jp,
  hasOwnProperty: Lr,
  hasOwnProp: Lr,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Ic,
  freezeMethods: Qp,
  toObjectSet: ed,
  toCamelCase: Yp,
  noop: td,
  toFiniteNumber: nd,
  findKey: Nc,
  global: Et,
  isContextDefined: Ac,
  ALPHABET: Cc,
  generateString: ad,
  isSpecCompliantForm: sd,
  toJSONObject: id,
  isAsyncFn: rd,
  isThenable: od,
  setImmediate: Lc,
  asap: cd
};
function D(e, t, n, a, s) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", t && (this.code = t), n && (this.config = n), a && (this.request = a), s && (this.response = s, this.status = s.status ? s.status : null);
}
_.inherits(D, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: _.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Dc = D.prototype, Fc = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Fc[e] = { value: e };
});
Object.defineProperties(D, Fc);
Object.defineProperty(Dc, "isAxiosError", { value: !0 });
D.from = (e, t, n, a, s, i) => {
  const r = Object.create(Dc);
  return _.toFlatObject(e, r, function(c) {
    return c !== Error.prototype;
  }, (l) => l !== "isAxiosError"), D.call(r, e.message, t, n, a, s), r.cause = e, r.name = e.name, i && Object.assign(r, i), r;
};
var zc = Le.Stream, ld = _n, ud = Me;
function Me() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
ld.inherits(Me, zc);
Me.create = function(e, t) {
  var n = new this();
  t = t || {};
  for (var a in t)
    n[a] = t[a];
  n.source = e;
  var s = e.emit;
  return e.emit = function() {
    return n._handleEmit(arguments), s.apply(e, arguments);
  }, e.on("error", function() {
  }), n.pauseStream && e.pause(), n;
};
Object.defineProperty(Me.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
Me.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
Me.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
Me.prototype.pause = function() {
  this.source.pause();
};
Me.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
Me.prototype.pipe = function() {
  var e = zc.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
Me.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
Me.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var pd = _n, Uc = Le.Stream, Fr = ud, dd = le;
function le() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
pd.inherits(le, Uc);
le.create = function(e) {
  var t = new this();
  e = e || {};
  for (var n in e)
    t[n] = e[n];
  return t;
};
le.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
le.prototype.append = function(e) {
  var t = le.isStreamLike(e);
  if (t) {
    if (!(e instanceof Fr)) {
      var n = Fr.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = n;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
le.prototype.pipe = function(e, t) {
  return Uc.prototype.pipe.call(this, e, t), this.resume(), e;
};
le.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
le.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var t = e;
  t((function(n) {
    var a = le.isStreamLike(n);
    a && (n.on("data", this._checkDataSize.bind(this)), this._handleErrors(n)), this._pipeNext(n);
  }).bind(this));
};
le.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var t = le.isStreamLike(e);
  if (t) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var n = e;
  this.write(n), this._getNext();
};
le.prototype._handleErrors = function(e) {
  var t = this;
  e.on("error", function(n) {
    t._emitError(n);
  });
};
le.prototype.write = function(e) {
  this.emit("data", e);
};
le.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
le.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
le.prototype.end = function() {
  this._reset(), this.emit("end");
};
le.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
le.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
le.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
le.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(t) {
    t.dataSize && (e.dataSize += t.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
le.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var qc = {};
const md = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var fd = md;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var t = fd, n = Te.extname, a = /^\s*([^;\s]*)(?:;|\s|$)/, s = /^text\//i;
  e.charset = i, e.charsets = { lookup: i }, e.contentType = r, e.extension = l, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = c, e.types = /* @__PURE__ */ Object.create(null), o(e.extensions, e.types);
  function i(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = a.exec(u), f = p && t[p[1].toLowerCase()];
    return f && f.charset ? f.charset : p && s.test(p[1]) ? "UTF-8" : !1;
  }
  function r(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = u.indexOf("/") === -1 ? e.lookup(u) : u;
    if (!p)
      return !1;
    if (p.indexOf("charset") === -1) {
      var f = e.charset(p);
      f && (p += "; charset=" + f.toLowerCase());
    }
    return p;
  }
  function l(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = a.exec(u), f = p && e.extensions[p[1].toLowerCase()];
    return !f || !f.length ? !1 : f[0];
  }
  function c(u) {
    if (!u || typeof u != "string")
      return !1;
    var p = n("x." + u).toLowerCase().substr(1);
    return p && e.types[p] || !1;
  }
  function o(u, p) {
    var f = ["nginx", "apache", void 0, "iana"];
    Object.keys(t).forEach(function(m) {
      var y = t[m], g = y.extensions;
      if (!(!g || !g.length)) {
        u[m] = g;
        for (var v = 0; v < g.length; v++) {
          var $ = g[v];
          if (p[$]) {
            var E = f.indexOf(t[p[$]].source), O = f.indexOf(y.source);
            if (p[$] !== "application/octet-stream" && (E > O || E === O && p[$].substr(0, 12) === "application/"))
              continue;
          }
          p[$] = m;
        }
      }
    });
  }
})(qc);
var hd = vd;
function vd(e) {
  var t = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  t ? t(e) : setTimeout(e, 0);
}
var zr = hd, Mc = gd;
function gd(e) {
  var t = !1;
  return zr(function() {
    t = !0;
  }), function(a, s) {
    t ? e(a, s) : zr(function() {
      e(a, s);
    });
  };
}
var Vc = xd;
function xd(e) {
  Object.keys(e.jobs).forEach(yd.bind(e)), e.jobs = {};
}
function yd(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var Ur = Mc, bd = Vc, Bc = $d;
function $d(e, t, n, a) {
  var s = n.keyedList ? n.keyedList[n.index] : n.index;
  n.jobs[s] = wd(t, s, e[s], function(i, r) {
    s in n.jobs && (delete n.jobs[s], i ? bd(n) : n.results[s] = r, a(i, n.results));
  });
}
function wd(e, t, n, a) {
  var s;
  return e.length == 2 ? s = e(n, Ur(a)) : s = e(n, t, Ur(a)), s;
}
var Hc = _d;
function _d(e, t) {
  var n = !Array.isArray(e), a = {
    index: 0,
    keyedList: n || t ? Object.keys(e) : null,
    jobs: {},
    results: n ? {} : [],
    size: n ? Object.keys(e).length : e.length
  };
  return t && a.keyedList.sort(n ? t : function(s, i) {
    return t(e[s], e[i]);
  }), a;
}
var Ed = Vc, Sd = Mc, Gc = Rd;
function Rd(e) {
  Object.keys(this.jobs).length && (this.index = this.size, Ed(this), Sd(e)(null, this.results));
}
var kd = Bc, jd = Hc, Td = Gc, Od = Pd;
function Pd(e, t, n) {
  for (var a = jd(e); a.index < (a.keyedList || e).length; )
    kd(e, t, a, function(s, i) {
      if (s) {
        n(s, i);
        return;
      }
      if (Object.keys(a.jobs).length === 0) {
        n(null, a.results);
        return;
      }
    }), a.index++;
  return Td.bind(a, n);
}
var va = { exports: {} }, qr = Bc, Nd = Hc, Ad = Gc;
va.exports = Id;
va.exports.ascending = Kc;
va.exports.descending = Cd;
function Id(e, t, n, a) {
  var s = Nd(e, n);
  return qr(e, t, s, function i(r, l) {
    if (r) {
      a(r, l);
      return;
    }
    if (s.index++, s.index < (s.keyedList || e).length) {
      qr(e, t, s, i);
      return;
    }
    a(null, s.results);
  }), Ad.bind(s, a);
}
function Kc(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
function Cd(e, t) {
  return -1 * Kc(e, t);
}
var Wc = va.exports, Ld = Wc, Dd = Fd;
function Fd(e, t, n) {
  return Ld(e, t, null, n);
}
var zd = {
  parallel: Od,
  serial: Dd,
  serialOrdered: Wc
}, Ud = function(e, t) {
  return Object.keys(t).forEach(function(n) {
    e[n] = e[n] || t[n];
  }), e;
}, si = dd, qd = _n, es = Te, Md = Qs, Vd = ei, Bd = pa.parse, Hd = de, Gd = Le.Stream, ts = qc, Kd = zd, js = Ud, Wd = Z;
qd.inherits(Z, si);
function Z(e) {
  if (!(this instanceof Z))
    return new Z(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], si.call(this), e = e || {};
  for (var t in e)
    this[t] = e[t];
}
Z.LINE_BREAK = `\r
`;
Z.DEFAULT_CONTENT_TYPE = "application/octet-stream";
Z.prototype.append = function(e, t, n) {
  n = n || {}, typeof n == "string" && (n = { filename: n });
  var a = si.prototype.append.bind(this);
  if (typeof t == "number" && (t = "" + t), Array.isArray(t)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var s = this._multiPartHeader(e, t, n), i = this._multiPartFooter();
  a(s), a(t), a(i), this._trackLength(s, t, n);
};
Z.prototype._trackLength = function(e, t, n) {
  var a = 0;
  n.knownLength != null ? a += +n.knownLength : Buffer.isBuffer(t) ? a = t.length : typeof t == "string" && (a = Buffer.byteLength(t)), this._valueLength += a, this._overheadLength += Buffer.byteLength(e) + Z.LINE_BREAK.length, !(!t || !t.path && !(t.readable && t.hasOwnProperty("httpVersion")) && !(t instanceof Gd)) && (n.knownLength || this._valuesToMeasure.push(t));
};
Z.prototype._lengthRetriever = function(e, t) {
  e.hasOwnProperty("fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? t(null, e.end + 1 - (e.start ? e.start : 0)) : Hd.stat(e.path, function(n, a) {
    var s;
    if (n) {
      t(n);
      return;
    }
    s = a.size - (e.start ? e.start : 0), t(null, s);
  }) : e.hasOwnProperty("httpVersion") ? t(null, +e.headers["content-length"]) : e.hasOwnProperty("httpModule") ? (e.on("response", function(n) {
    e.pause(), t(null, +n.headers["content-length"]);
  }), e.resume()) : t("Unknown stream");
};
Z.prototype._multiPartHeader = function(e, t, n) {
  if (typeof n.header == "string")
    return n.header;
  var a = this._getContentDisposition(t, n), s = this._getContentType(t, n), i = "", r = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(a || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(s || [])
  };
  typeof n.header == "object" && js(r, n.header);
  var l;
  for (var c in r)
    r.hasOwnProperty(c) && (l = r[c], l != null && (Array.isArray(l) || (l = [l]), l.length && (i += c + ": " + l.join("; ") + Z.LINE_BREAK)));
  return "--" + this.getBoundary() + Z.LINE_BREAK + i + Z.LINE_BREAK;
};
Z.prototype._getContentDisposition = function(e, t) {
  var n, a;
  return typeof t.filepath == "string" ? n = es.normalize(t.filepath).replace(/\\/g, "/") : t.filename || e.name || e.path ? n = es.basename(t.filename || e.name || e.path) : e.readable && e.hasOwnProperty("httpVersion") && (n = es.basename(e.client._httpMessage.path || "")), n && (a = 'filename="' + n + '"'), a;
};
Z.prototype._getContentType = function(e, t) {
  var n = t.contentType;
  return !n && e.name && (n = ts.lookup(e.name)), !n && e.path && (n = ts.lookup(e.path)), !n && e.readable && e.hasOwnProperty("httpVersion") && (n = e.headers["content-type"]), !n && (t.filepath || t.filename) && (n = ts.lookup(t.filepath || t.filename)), !n && typeof e == "object" && (n = Z.DEFAULT_CONTENT_TYPE), n;
};
Z.prototype._multiPartFooter = function() {
  return (function(e) {
    var t = Z.LINE_BREAK, n = this._streams.length === 0;
    n && (t += this._lastBoundary()), e(t);
  }).bind(this);
};
Z.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + Z.LINE_BREAK;
};
Z.prototype.getHeaders = function(e) {
  var t, n = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (t in e)
    e.hasOwnProperty(t) && (n[t.toLowerCase()] = e[t]);
  return n;
};
Z.prototype.setBoundary = function(e) {
  this._boundary = e;
};
Z.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
Z.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), t = this.getBoundary(), n = 0, a = this._streams.length; n < a; n++)
    typeof this._streams[n] != "function" && (Buffer.isBuffer(this._streams[n]) ? e = Buffer.concat([e, this._streams[n]]) : e = Buffer.concat([e, Buffer.from(this._streams[n])]), (typeof this._streams[n] != "string" || this._streams[n].substring(2, t.length + 2) !== t) && (e = Buffer.concat([e, Buffer.from(Z.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
Z.prototype._generateBoundary = function() {
  for (var e = "--------------------------", t = 0; t < 24; t++)
    e += Math.floor(Math.random() * 10).toString(16);
  this._boundary = e;
};
Z.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
Z.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
Z.prototype.getLength = function(e) {
  var t = this._overheadLength + this._valueLength;
  if (this._streams.length && (t += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, t));
    return;
  }
  Kd.parallel(this._valuesToMeasure, this._lengthRetriever, function(n, a) {
    if (n) {
      e(n);
      return;
    }
    a.forEach(function(s) {
      t += s;
    }), e(null, t);
  });
};
Z.prototype.submit = function(e, t) {
  var n, a, s = { method: "post" };
  return typeof e == "string" ? (e = Bd(e), a = js({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, s)) : (a = js(e, s), a.port || (a.port = a.protocol == "https:" ? 443 : 80)), a.headers = this.getHeaders(e.headers), a.protocol == "https:" ? n = Vd.request(a) : n = Md.request(a), this.getLength((function(i, r) {
    if (i && i !== "Unknown stream") {
      this._error(i);
      return;
    }
    if (r && n.setHeader("Content-Length", r), this.pipe(n), t) {
      var l, c = function(o, u) {
        return n.removeListener("error", c), n.removeListener("response", l), t.call(this, o, u);
      };
      l = c.bind(this, null), n.on("error", c), n.on("response", l);
    }
  }).bind(this)), n;
};
Z.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
Z.prototype.toString = function() {
  return "[object FormData]";
};
const Xc = /* @__PURE__ */ En(Wd);
function Ts(e) {
  return _.isPlainObject(e) || _.isArray(e);
}
function Jc(e) {
  return _.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Mr(e, t, n) {
  return e ? e.concat(t).map(function(s, i) {
    return s = Jc(s), !n && i ? "[" + s + "]" : s;
  }).join(n ? "." : "") : t;
}
function Xd(e) {
  return _.isArray(e) && !e.some(Ts);
}
const Jd = _.toFlatObject(_, {}, null, function(t) {
  return /^is[A-Z]/.test(t);
});
function ga(e, t, n) {
  if (!_.isObject(e))
    throw new TypeError("target must be an object");
  t = t || new (Xc || FormData)(), n = _.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(y, g) {
    return !_.isUndefined(g[y]);
  });
  const a = n.metaTokens, s = n.visitor || u, i = n.dots, r = n.indexes, c = (n.Blob || typeof Blob < "u" && Blob) && _.isSpecCompliantForm(t);
  if (!_.isFunction(s))
    throw new TypeError("visitor must be a function");
  function o(m) {
    if (m === null) return "";
    if (_.isDate(m))
      return m.toISOString();
    if (!c && _.isBlob(m))
      throw new D("Blob is not supported. Use a Buffer instead.");
    return _.isArrayBuffer(m) || _.isTypedArray(m) ? c && typeof Blob == "function" ? new Blob([m]) : Buffer.from(m) : m;
  }
  function u(m, y, g) {
    let v = m;
    if (m && !g && typeof m == "object") {
      if (_.endsWith(y, "{}"))
        y = a ? y : y.slice(0, -2), m = JSON.stringify(m);
      else if (_.isArray(m) && Xd(m) || (_.isFileList(m) || _.endsWith(y, "[]")) && (v = _.toArray(m)))
        return y = Jc(y), v.forEach(function(E, O) {
          !(_.isUndefined(E) || E === null) && t.append(
            // eslint-disable-next-line no-nested-ternary
            r === !0 ? Mr([y], O, i) : r === null ? y : y + "[]",
            o(E)
          );
        }), !1;
    }
    return Ts(m) ? !0 : (t.append(Mr(g, y, i), o(m)), !1);
  }
  const p = [], f = Object.assign(Jd, {
    defaultVisitor: u,
    convertValue: o,
    isVisitable: Ts
  });
  function h(m, y) {
    if (!_.isUndefined(m)) {
      if (p.indexOf(m) !== -1)
        throw Error("Circular reference detected in " + y.join("."));
      p.push(m), _.forEach(m, function(v, $) {
        (!(_.isUndefined(v) || v === null) && s.call(
          t,
          v,
          _.isString($) ? $.trim() : $,
          y,
          f
        )) === !0 && h(v, y ? y.concat($) : [$]);
      }), p.pop();
    }
  }
  if (!_.isObject(e))
    throw new TypeError("data must be an object");
  return h(e), t;
}
function Vr(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(a) {
    return t[a];
  });
}
function Yc(e, t) {
  this._pairs = [], e && ga(e, this, t);
}
const Zc = Yc.prototype;
Zc.append = function(t, n) {
  this._pairs.push([t, n]);
};
Zc.toString = function(t) {
  const n = t ? function(a) {
    return t.call(this, a, Vr);
  } : Vr;
  return this._pairs.map(function(s) {
    return n(s[0]) + "=" + n(s[1]);
  }, "").join("&");
};
function Yd(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+").replace(/%5B/gi, "[").replace(/%5D/gi, "]");
}
function ii(e, t, n) {
  if (!t)
    return e;
  const a = n && n.encode || Yd, s = n && n.serialize;
  let i;
  if (s ? i = s(t, n) : i = _.isURLSearchParams(t) ? t.toString() : new Yc(t, n).toString(a), i) {
    const r = e.indexOf("#");
    r !== -1 && (e = e.slice(0, r)), e += (e.indexOf("?") === -1 ? "?" : "&") + i;
  }
  return e;
}
class Br {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(t, n, a) {
    return this.handlers.push({
      fulfilled: t,
      rejected: n,
      synchronous: a ? a.synchronous : !1,
      runWhen: a ? a.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {Boolean} `true` if the interceptor was removed, `false` otherwise
   */
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(t) {
    _.forEach(this.handlers, function(a) {
      a !== null && t(a);
    });
  }
}
const ri = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Zd = pa.URLSearchParams, Qd = {
  isNode: !0,
  classes: {
    URLSearchParams: Zd,
    FormData: Xc,
    Blob: typeof Blob < "u" && Blob || null
  },
  protocols: ["http", "https", "file", "data"]
}, oi = typeof window < "u" && typeof document < "u", Os = typeof navigator == "object" && navigator || void 0, em = oi && (!Os || ["ReactNative", "NativeScript", "NS"].indexOf(Os.product) < 0), tm = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", nm = oi && window.location.href || "http://localhost", am = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: oi,
  hasStandardBrowserEnv: em,
  hasStandardBrowserWebWorkerEnv: tm,
  navigator: Os,
  origin: nm
}, Symbol.toStringTag, { value: "Module" })), ge = {
  ...am,
  ...Qd
};
function sm(e, t) {
  return ga(e, new ge.classes.URLSearchParams(), Object.assign({
    visitor: function(n, a, s, i) {
      return ge.isNode && _.isBuffer(n) ? (this.append(a, n.toString("base64")), !1) : i.defaultVisitor.apply(this, arguments);
    }
  }, t));
}
function im(e) {
  return _.matchAll(/\w+|\[(\w*)]/g, e).map((t) => t[0] === "[]" ? "" : t[1] || t[0]);
}
function rm(e) {
  const t = {}, n = Object.keys(e);
  let a;
  const s = n.length;
  let i;
  for (a = 0; a < s; a++)
    i = n[a], t[i] = e[i];
  return t;
}
function Qc(e) {
  function t(n, a, s, i) {
    let r = n[i++];
    if (r === "__proto__") return !0;
    const l = Number.isFinite(+r), c = i >= n.length;
    return r = !r && _.isArray(s) ? s.length : r, c ? (_.hasOwnProp(s, r) ? s[r] = [s[r], a] : s[r] = a, !l) : ((!s[r] || !_.isObject(s[r])) && (s[r] = []), t(n, a, s[r], i) && _.isArray(s[r]) && (s[r] = rm(s[r])), !l);
  }
  if (_.isFormData(e) && _.isFunction(e.entries)) {
    const n = {};
    return _.forEachEntry(e, (a, s) => {
      t(im(a), s, n, 0);
    }), n;
  }
  return null;
}
function om(e, t, n) {
  if (_.isString(e))
    try {
      return (t || JSON.parse)(e), _.trim(e);
    } catch (a) {
      if (a.name !== "SyntaxError")
        throw a;
    }
  return (0, JSON.stringify)(e);
}
const Rn = {
  transitional: ri,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(t, n) {
    const a = n.getContentType() || "", s = a.indexOf("application/json") > -1, i = _.isObject(t);
    if (i && _.isHTMLForm(t) && (t = new FormData(t)), _.isFormData(t))
      return s ? JSON.stringify(Qc(t)) : t;
    if (_.isArrayBuffer(t) || _.isBuffer(t) || _.isStream(t) || _.isFile(t) || _.isBlob(t) || _.isReadableStream(t))
      return t;
    if (_.isArrayBufferView(t))
      return t.buffer;
    if (_.isURLSearchParams(t))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), t.toString();
    let l;
    if (i) {
      if (a.indexOf("application/x-www-form-urlencoded") > -1)
        return sm(t, this.formSerializer).toString();
      if ((l = _.isFileList(t)) || a.indexOf("multipart/form-data") > -1) {
        const c = this.env && this.env.FormData;
        return ga(
          l ? { "files[]": t } : t,
          c && new c(),
          this.formSerializer
        );
      }
    }
    return i || s ? (n.setContentType("application/json", !1), om(t)) : t;
  }],
  transformResponse: [function(t) {
    const n = this.transitional || Rn.transitional, a = n && n.forcedJSONParsing, s = this.responseType === "json";
    if (_.isResponse(t) || _.isReadableStream(t))
      return t;
    if (t && _.isString(t) && (a && !this.responseType || s)) {
      const r = !(n && n.silentJSONParsing) && s;
      try {
        return JSON.parse(t);
      } catch (l) {
        if (r)
          throw l.name === "SyntaxError" ? D.from(l, D.ERR_BAD_RESPONSE, this, null, this.response) : l;
      }
    }
    return t;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: ge.classes.FormData,
    Blob: ge.classes.Blob
  },
  validateStatus: function(t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
_.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  Rn.headers[e] = {};
});
const cm = _.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), lm = (e) => {
  const t = {};
  let n, a, s;
  return e && e.split(`
`).forEach(function(r) {
    s = r.indexOf(":"), n = r.substring(0, s).trim().toLowerCase(), a = r.substring(s + 1).trim(), !(!n || t[n] && cm[n]) && (n === "set-cookie" ? t[n] ? t[n].push(a) : t[n] = [a] : t[n] = t[n] ? t[n] + ", " + a : a);
  }), t;
}, Hr = Symbol("internals");
function on(e) {
  return e && String(e).trim().toLowerCase();
}
function Wn(e) {
  return e === !1 || e == null ? e : _.isArray(e) ? e.map(Wn) : String(e);
}
function um(e) {
  const t = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let a;
  for (; a = n.exec(e); )
    t[a[1]] = a[2];
  return t;
}
const pm = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ns(e, t, n, a, s) {
  if (_.isFunction(a))
    return a.call(this, t, n);
  if (s && (t = n), !!_.isString(t)) {
    if (_.isString(a))
      return t.indexOf(a) !== -1;
    if (_.isRegExp(a))
      return a.test(t);
  }
}
function dm(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (t, n, a) => n.toUpperCase() + a);
}
function mm(e, t) {
  const n = _.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((a) => {
    Object.defineProperty(e, a + n, {
      value: function(s, i, r) {
        return this[a].call(this, t, s, i, r);
      },
      configurable: !0
    });
  });
}
class be {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, a) {
    const s = this;
    function i(l, c, o) {
      const u = on(c);
      if (!u)
        throw new Error("header name must be a non-empty string");
      const p = _.findKey(s, u);
      (!p || s[p] === void 0 || o === !0 || o === void 0 && s[p] !== !1) && (s[p || c] = Wn(l));
    }
    const r = (l, c) => _.forEach(l, (o, u) => i(o, u, c));
    if (_.isPlainObject(t) || t instanceof this.constructor)
      r(t, n);
    else if (_.isString(t) && (t = t.trim()) && !pm(t))
      r(lm(t), n);
    else if (_.isHeaders(t))
      for (const [l, c] of t.entries())
        i(c, l, a);
    else
      t != null && i(n, t, a);
    return this;
  }
  get(t, n) {
    if (t = on(t), t) {
      const a = _.findKey(this, t);
      if (a) {
        const s = this[a];
        if (!n)
          return s;
        if (n === !0)
          return um(s);
        if (_.isFunction(n))
          return n.call(this, s, a);
        if (_.isRegExp(n))
          return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (t = on(t), t) {
      const a = _.findKey(this, t);
      return !!(a && this[a] !== void 0 && (!n || ns(this, this[a], a, n)));
    }
    return !1;
  }
  delete(t, n) {
    const a = this;
    let s = !1;
    function i(r) {
      if (r = on(r), r) {
        const l = _.findKey(a, r);
        l && (!n || ns(a, a[l], l, n)) && (delete a[l], s = !0);
      }
    }
    return _.isArray(t) ? t.forEach(i) : i(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let a = n.length, s = !1;
    for (; a--; ) {
      const i = n[a];
      (!t || ns(this, this[i], i, t, !0)) && (delete this[i], s = !0);
    }
    return s;
  }
  normalize(t) {
    const n = this, a = {};
    return _.forEach(this, (s, i) => {
      const r = _.findKey(a, i);
      if (r) {
        n[r] = Wn(s), delete n[i];
        return;
      }
      const l = t ? dm(i) : String(i).trim();
      l !== i && delete n[i], n[l] = Wn(s), a[l] = !0;
    }), this;
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = /* @__PURE__ */ Object.create(null);
    return _.forEach(this, (a, s) => {
      a != null && a !== !1 && (n[s] = t && _.isArray(a) ? a.join(", ") : a);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const a = new this(t);
    return n.forEach((s) => a.set(s)), a;
  }
  static accessor(t) {
    const a = (this[Hr] = this[Hr] = {
      accessors: {}
    }).accessors, s = this.prototype;
    function i(r) {
      const l = on(r);
      a[l] || (mm(s, r), a[l] = !0);
    }
    return _.isArray(t) ? t.forEach(i) : i(t), this;
  }
}
be.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
_.reduceDescriptors(be.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(a) {
      this[n] = a;
    }
  };
});
_.freezeMethods(be);
function as(e, t) {
  const n = this || Rn, a = t || n, s = be.from(a.headers);
  let i = a.data;
  return _.forEach(e, function(l) {
    i = l.call(n, i, s.normalize(), t ? t.status : void 0);
  }), s.normalize(), i;
}
function el(e) {
  return !!(e && e.__CANCEL__);
}
function xt(e, t, n) {
  D.call(this, e ?? "canceled", D.ERR_CANCELED, t, n), this.name = "CanceledError";
}
_.inherits(xt, D, {
  __CANCEL__: !0
});
function Ut(e, t, n) {
  const a = n.config.validateStatus;
  !n.status || !a || a(n.status) ? e(n) : t(new D(
    "Request failed with status code " + n.status,
    [D.ERR_BAD_REQUEST, D.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function fm(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function hm(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function ci(e, t) {
  return e && !fm(t) ? hm(e, t) : t;
}
var vm = pa.parse, gm = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, xm = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function ym(e) {
  var t = typeof e == "string" ? vm(e) : e || {}, n = t.protocol, a = t.host, s = t.port;
  if (typeof a != "string" || !a || typeof n != "string" || (n = n.split(":", 1)[0], a = a.replace(/:\d*$/, ""), s = parseInt(s) || gm[n] || 0, !bm(a, s)))
    return "";
  var i = qt("npm_config_" + n + "_proxy") || qt(n + "_proxy") || qt("npm_config_proxy") || qt("all_proxy");
  return i && i.indexOf("://") === -1 && (i = n + "://" + i), i;
}
function bm(e, t) {
  var n = (qt("npm_config_no_proxy") || qt("no_proxy")).toLowerCase();
  return n ? n === "*" ? !1 : n.split(/[,\s]/).every(function(a) {
    if (!a)
      return !0;
    var s = a.match(/^(.+):(\d+)$/), i = s ? s[1] : a, r = s ? parseInt(s[2]) : 0;
    return r && r !== t ? !0 : /^[.*]/.test(i) ? (i.charAt(0) === "*" && (i = i.slice(1)), !xm.call(e, i)) : e !== i;
  }) : !0;
}
function qt(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
var $m = ym, li = { exports: {} }, An = { exports: {} }, In = { exports: {} }, ss, Gr;
function wm() {
  if (Gr) return ss;
  Gr = 1;
  var e = 1e3, t = e * 60, n = t * 60, a = n * 24, s = a * 7, i = a * 365.25;
  ss = function(u, p) {
    p = p || {};
    var f = typeof u;
    if (f === "string" && u.length > 0)
      return r(u);
    if (f === "number" && isFinite(u))
      return p.long ? c(u) : l(u);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(u)
    );
  };
  function r(u) {
    if (u = String(u), !(u.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        u
      );
      if (p) {
        var f = parseFloat(p[1]), h = (p[2] || "ms").toLowerCase();
        switch (h) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return f * i;
          case "weeks":
          case "week":
          case "w":
            return f * s;
          case "days":
          case "day":
          case "d":
            return f * a;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return f * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return f * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return f * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return f;
          default:
            return;
        }
      }
    }
  }
  function l(u) {
    var p = Math.abs(u);
    return p >= a ? Math.round(u / a) + "d" : p >= n ? Math.round(u / n) + "h" : p >= t ? Math.round(u / t) + "m" : p >= e ? Math.round(u / e) + "s" : u + "ms";
  }
  function c(u) {
    var p = Math.abs(u);
    return p >= a ? o(u, p, a, "day") : p >= n ? o(u, p, n, "hour") : p >= t ? o(u, p, t, "minute") : p >= e ? o(u, p, e, "second") : u + " ms";
  }
  function o(u, p, f, h) {
    var m = p >= f * 1.5;
    return Math.round(u / f) + " " + h + (m ? "s" : "");
  }
  return ss;
}
var is, Kr;
function tl() {
  if (Kr) return is;
  Kr = 1;
  function e(t) {
    a.debug = a, a.default = a, a.coerce = o, a.disable = r, a.enable = i, a.enabled = l, a.humanize = wm(), a.destroy = u, Object.keys(t).forEach((p) => {
      a[p] = t[p];
    }), a.names = [], a.skips = [], a.formatters = {};
    function n(p) {
      let f = 0;
      for (let h = 0; h < p.length; h++)
        f = (f << 5) - f + p.charCodeAt(h), f |= 0;
      return a.colors[Math.abs(f) % a.colors.length];
    }
    a.selectColor = n;
    function a(p) {
      let f, h = null, m, y;
      function g(...v) {
        if (!g.enabled)
          return;
        const $ = g, E = Number(/* @__PURE__ */ new Date()), O = E - (f || E);
        $.diff = O, $.prev = f, $.curr = E, f = E, v[0] = a.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let P = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (W, se) => {
          if (W === "%%")
            return "%";
          P++;
          const ce = a.formatters[se];
          if (typeof ce == "function") {
            const he = v[P];
            W = ce.call($, he), v.splice(P, 1), P--;
          }
          return W;
        }), a.formatArgs.call($, v), ($.log || a.log).apply($, v);
      }
      return g.namespace = p, g.useColors = a.useColors(), g.color = a.selectColor(p), g.extend = s, g.destroy = a.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => h !== null ? h : (m !== a.namespaces && (m = a.namespaces, y = a.enabled(p)), y),
        set: (v) => {
          h = v;
        }
      }), typeof a.init == "function" && a.init(g), g;
    }
    function s(p, f) {
      const h = a(this.namespace + (typeof f > "u" ? ":" : f) + p);
      return h.log = this.log, h;
    }
    function i(p) {
      a.save(p), a.namespaces = p, a.names = [], a.skips = [];
      let f;
      const h = (typeof p == "string" ? p : "").split(/[\s,]+/), m = h.length;
      for (f = 0; f < m; f++)
        h[f] && (p = h[f].replace(/\*/g, ".*?"), p[0] === "-" ? a.skips.push(new RegExp("^" + p.slice(1) + "$")) : a.names.push(new RegExp("^" + p + "$")));
    }
    function r() {
      const p = [
        ...a.names.map(c),
        ...a.skips.map(c).map((f) => "-" + f)
      ].join(",");
      return a.enable(""), p;
    }
    function l(p) {
      if (p[p.length - 1] === "*")
        return !0;
      let f, h;
      for (f = 0, h = a.skips.length; f < h; f++)
        if (a.skips[f].test(p))
          return !1;
      for (f = 0, h = a.names.length; f < h; f++)
        if (a.names[f].test(p))
          return !0;
      return !1;
    }
    function c(p) {
      return p.toString().substring(2, p.toString().length - 2).replace(/\.\*\?$/, "*");
    }
    function o(p) {
      return p instanceof Error ? p.stack || p.message : p;
    }
    function u() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return a.enable(a.load()), a;
  }
  return is = e, is;
}
var Wr;
function _m() {
  return Wr || (Wr = 1, function(e, t) {
    t.formatArgs = a, t.save = s, t.load = i, t.useColors = n, t.storage = r(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function a(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const o = "color: " + this.color;
      c.splice(1, 0, o, "color: inherit");
      let u = 0, p = 0;
      c[0].replace(/%[a-zA-Z%]/g, (f) => {
        f !== "%%" && (u++, f === "%c" && (p = u));
      }), c.splice(p, 0, o);
    }
    t.log = console.debug || console.log || (() => {
    });
    function s(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function i() {
      let c;
      try {
        c = t.storage.getItem("debug");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function r() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = tl()(t);
    const { formatters: l } = e.exports;
    l.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (o) {
        return "[UnexpectedJSONParseError]: " + o.message;
      }
    };
  }(In, In.exports)), In.exports;
}
var Cn = { exports: {} }, rs, Xr;
function Em() {
  return Xr || (Xr = 1, rs = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", a = t.indexOf(n + e), s = t.indexOf("--");
    return a !== -1 && (s === -1 || a < s);
  }), rs;
}
var os, Jr;
function Sm() {
  if (Jr) return os;
  Jr = 1;
  const e = Ec, t = Rc, n = Em(), { env: a } = process;
  let s;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? s = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (s = 1), "FORCE_COLOR" in a && (a.FORCE_COLOR === "true" ? s = 1 : a.FORCE_COLOR === "false" ? s = 0 : s = a.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(a.FORCE_COLOR, 10), 3));
  function i(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function r(c, o) {
    if (s === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !o && s === void 0)
      return 0;
    const u = s || 0;
    if (a.TERM === "dumb")
      return u;
    if (process.platform === "win32") {
      const p = e.release().split(".");
      return Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in a)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((p) => p in a) || a.CI_NAME === "codeship" ? 1 : u;
    if ("TEAMCITY_VERSION" in a)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(a.TEAMCITY_VERSION) ? 1 : 0;
    if (a.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in a) {
      const p = parseInt((a.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (a.TERM_PROGRAM) {
        case "iTerm.app":
          return p >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(a.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(a.TERM) || "COLORTERM" in a ? 1 : u;
  }
  function l(c) {
    const o = r(c, c && c.isTTY);
    return i(o);
  }
  return os = {
    supportsColor: l,
    stdout: i(r(!0, t.isatty(1))),
    stderr: i(r(!0, t.isatty(2)))
  }, os;
}
var Yr;
function Rm() {
  return Yr || (Yr = 1, function(e, t) {
    const n = Rc, a = _n;
    t.init = u, t.log = l, t.formatArgs = i, t.save = c, t.load = o, t.useColors = s, t.destroy = a.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const f = Sm();
      f && (f.stderr || f).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((f) => /^debug_/i.test(f)).reduce((f, h) => {
      const m = h.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let y = process.env[h];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), f[m] = y, f;
    }, {});
    function s() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function i(f) {
      const { namespace: h, useColors: m } = this;
      if (m) {
        const y = this.color, g = "\x1B[3" + (y < 8 ? y : "8;5;" + y), v = `  ${g};1m${h} \x1B[0m`;
        f[0] = v + f[0].split(`
`).join(`
` + v), f.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        f[0] = r() + h + " " + f[0];
    }
    function r() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function l(...f) {
      return process.stderr.write(a.formatWithOptions(t.inspectOpts, ...f) + `
`);
    }
    function c(f) {
      f ? process.env.DEBUG = f : delete process.env.DEBUG;
    }
    function o() {
      return process.env.DEBUG;
    }
    function u(f) {
      f.inspectOpts = {};
      const h = Object.keys(t.inspectOpts);
      for (let m = 0; m < h.length; m++)
        f.inspectOpts[h[m]] = t.inspectOpts[h[m]];
    }
    e.exports = tl()(t);
    const { formatters: p } = e.exports;
    p.o = function(f) {
      return this.inspectOpts.colors = this.useColors, a.inspect(f, this.inspectOpts).split(`
`).map((h) => h.trim()).join(" ");
    }, p.O = function(f) {
      return this.inspectOpts.colors = this.useColors, a.inspect(f, this.inspectOpts);
    };
  }(Cn, Cn.exports)), Cn.exports;
}
var Zr;
function km() {
  return Zr || (Zr = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? An.exports = _m() : An.exports = Rm()), An.exports;
}
var cn, jm = function() {
  if (!cn) {
    try {
      cn = km()("follow-redirects");
    } catch {
    }
    typeof cn != "function" && (cn = function() {
    });
  }
  cn.apply(null, arguments);
}, kn = pa, bn = kn.URL, Tm = Qs, Om = ei, ui = Le.Writable, pi = Mu, nl = jm;
(function() {
  var t = typeof process < "u", n = typeof window < "u" && typeof document < "u", a = kt(Error.captureStackTrace);
  !t && (n || !a) && console.warn("The follow-redirects package should be excluded from browser builds.");
})();
var di = !1;
try {
  pi(new bn(""));
} catch (e) {
  di = e.code === "ERR_INVALID_URL";
}
var Pm = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], mi = ["abort", "aborted", "connect", "error", "socket", "timeout"], fi = /* @__PURE__ */ Object.create(null);
mi.forEach(function(e) {
  fi[e] = function(t, n, a) {
    this._redirectable.emit(e, t, n, a);
  };
});
var Ps = jn(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), Ns = jn(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), Nm = jn(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  Ns
), Am = jn(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), Im = jn(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), Cm = ui.prototype.destroy || sl;
function Oe(e, t) {
  ui.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], t && this.on("response", t);
  var n = this;
  this._onNativeResponse = function(a) {
    try {
      n._processResponse(a);
    } catch (s) {
      n.emit("error", s instanceof Ns ? s : new Ns({ cause: s }));
    }
  }, this._performRequest();
}
Oe.prototype = Object.create(ui.prototype);
Oe.prototype.abort = function() {
  vi(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
Oe.prototype.destroy = function(e) {
  return vi(this._currentRequest, e), Cm.call(this, e), this;
};
Oe.prototype.write = function(e, t, n) {
  if (this._ending)
    throw new Im();
  if (!St(e) && !Fm(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (kt(t) && (n = t, t = null), e.length === 0) {
    n && n();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: t }), this._currentRequest.write(e, t, n)) : (this.emit("error", new Am()), this.abort());
};
Oe.prototype.end = function(e, t, n) {
  if (kt(e) ? (n = e, e = t = null) : kt(t) && (n = t, t = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
  else {
    var a = this, s = this._currentRequest;
    this.write(e, t, function() {
      a._ended = !0, s.end(null, null, n);
    }), this._ending = !0;
  }
};
Oe.prototype.setHeader = function(e, t) {
  this._options.headers[e] = t, this._currentRequest.setHeader(e, t);
};
Oe.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
Oe.prototype.setTimeout = function(e, t) {
  var n = this;
  function a(r) {
    r.setTimeout(e), r.removeListener("timeout", r.destroy), r.addListener("timeout", r.destroy);
  }
  function s(r) {
    n._timeout && clearTimeout(n._timeout), n._timeout = setTimeout(function() {
      n.emit("timeout"), i();
    }, e), a(r);
  }
  function i() {
    n._timeout && (clearTimeout(n._timeout), n._timeout = null), n.removeListener("abort", i), n.removeListener("error", i), n.removeListener("response", i), n.removeListener("close", i), t && n.removeListener("timeout", t), n.socket || n._currentRequest.removeListener("socket", s);
  }
  return t && this.on("timeout", t), this.socket ? s(this.socket) : this._currentRequest.once("socket", s), this.on("socket", a), this.on("abort", i), this.on("error", i), this.on("response", i), this.on("close", i), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  Oe.prototype[e] = function(t, n) {
    return this._currentRequest[e](t, n);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(Oe.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
Oe.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var t = e.path.indexOf("?");
    t < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, t), e.search = e.path.substring(t));
  }
};
Oe.prototype._performRequest = function() {
  var e = this._options.protocol, t = this._options.nativeProtocols[e];
  if (!t)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var n = e.slice(0, -1);
    this._options.agent = this._options.agents[n];
  }
  var a = this._currentRequest = t.request(this._options, this._onNativeResponse);
  a._redirectable = this;
  for (var s of mi)
    a.on(s, fi[s]);
  if (this._currentUrl = /^\//.test(this._options.path) ? kn.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var i = 0, r = this, l = this._requestBodyBuffers;
    (function c(o) {
      if (a === r._currentRequest)
        if (o)
          r.emit("error", o);
        else if (i < l.length) {
          var u = l[i++];
          a.finished || a.write(u.data, u.encoding, c);
        } else r._ended && a.end();
    })();
  }
};
Oe.prototype._processResponse = function(e) {
  var t = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: t
  });
  var n = e.headers.location;
  if (!n || this._options.followRedirects === !1 || t < 300 || t >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (vi(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new Nm();
  var a, s = this._options.beforeRedirect;
  s && (a = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var i = this._options.method;
  ((t === 301 || t === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  t === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], cs(/^content-/i, this._options.headers));
  var r = cs(/^host$/i, this._options.headers), l = hi(this._currentUrl), c = r || l.host, o = /^\w+:/.test(n) ? this._currentUrl : kn.format(Object.assign(l, { host: c })), u = Lm(n, o);
  if (nl("redirecting to", u.href), this._isRedirect = !0, As(u, this._options), (u.protocol !== l.protocol && u.protocol !== "https:" || u.host !== c && !Dm(u.host, c)) && cs(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), kt(s)) {
    var p = {
      headers: e.headers,
      statusCode: t
    }, f = {
      url: o,
      method: i,
      headers: a
    };
    s(this._options, p, f), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function al(e) {
  var t = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, n = {};
  return Object.keys(e).forEach(function(a) {
    var s = a + ":", i = n[s] = e[a], r = t[a] = Object.create(i);
    function l(o, u, p) {
      return zm(o) ? o = As(o) : St(o) ? o = As(hi(o)) : (p = u, u = il(o), o = { protocol: s }), kt(u) && (p = u, u = null), u = Object.assign({
        maxRedirects: t.maxRedirects,
        maxBodyLength: t.maxBodyLength
      }, o, u), u.nativeProtocols = n, !St(u.host) && !St(u.hostname) && (u.hostname = "::1"), pi.equal(u.protocol, s, "protocol mismatch"), nl("options", u), new Oe(u, p);
    }
    function c(o, u, p) {
      var f = r.request(o, u, p);
      return f.end(), f;
    }
    Object.defineProperties(r, {
      request: { value: l, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: c, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), t;
}
function sl() {
}
function hi(e) {
  var t;
  if (di)
    t = new bn(e);
  else if (t = il(kn.parse(e)), !St(t.protocol))
    throw new Ps({ input: e });
  return t;
}
function Lm(e, t) {
  return di ? new bn(e, t) : hi(kn.resolve(t, e));
}
function il(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new Ps({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new Ps({ input: e.href || e });
  return e;
}
function As(e, t) {
  var n = t || {};
  for (var a of Pm)
    n[a] = e[a];
  return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
}
function cs(e, t) {
  var n;
  for (var a in t)
    e.test(a) && (n = t[a], delete t[a]);
  return n === null || typeof n > "u" ? void 0 : String(n).trim();
}
function jn(e, t, n) {
  function a(s) {
    kt(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, s || {}), this.code = e, this.message = this.cause ? t + ": " + this.cause.message : t;
  }
  return a.prototype = new (n || Error)(), Object.defineProperties(a.prototype, {
    constructor: {
      value: a,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), a;
}
function vi(e, t) {
  for (var n of mi)
    e.removeListener(n, fi[n]);
  e.on("error", sl), e.destroy(t);
}
function Dm(e, t) {
  pi(St(e) && St(t));
  var n = e.length - t.length - 1;
  return n > 0 && e[n] === "." && e.endsWith(t);
}
function St(e) {
  return typeof e == "string" || e instanceof String;
}
function kt(e) {
  return typeof e == "function";
}
function Fm(e) {
  return typeof e == "object" && "length" in e;
}
function zm(e) {
  return bn && e instanceof bn;
}
li.exports = al({ http: Tm, https: Om });
li.exports.wrap = al;
var Um = li.exports;
const qm = /* @__PURE__ */ En(Um), na = "1.7.7";
function rl(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return t && t[1] || "";
}
const Mm = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function Vm(e, t, n) {
  const a = n && n.Blob || ge.classes.Blob, s = rl(e);
  if (t === void 0 && a && (t = !0), s === "data") {
    e = s.length ? e.slice(s.length + 1) : e;
    const i = Mm.exec(e);
    if (!i)
      throw new D("Invalid URL", D.ERR_INVALID_URL);
    const r = i[1], l = i[2], c = i[3], o = Buffer.from(decodeURIComponent(c), l ? "base64" : "utf8");
    if (t) {
      if (!a)
        throw new D("Blob is not supported", D.ERR_NOT_SUPPORT);
      return new a([o], { type: r });
    }
    return o;
  }
  throw new D("Unsupported protocol " + s, D.ERR_NOT_SUPPORT);
}
const ls = Symbol("internals");
class Qr extends Le.Transform {
  constructor(t) {
    t = _.toFlatObject(t, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (a, s) => !_.isUndefined(s[a])), super({
      readableHighWaterMark: t.chunkSize
    });
    const n = this[ls] = {
      timeWindow: t.timeWindow,
      chunkSize: t.chunkSize,
      maxRate: t.maxRate,
      minChunkSize: t.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (a) => {
      a === "progress" && (n.isCaptured || (n.isCaptured = !0));
    });
  }
  _read(t) {
    const n = this[ls];
    return n.onReadCallback && n.onReadCallback(), super._read(t);
  }
  _transform(t, n, a) {
    const s = this[ls], i = s.maxRate, r = this.readableHighWaterMark, l = s.timeWindow, c = 1e3 / l, o = i / c, u = s.minChunkSize !== !1 ? Math.max(s.minChunkSize, o * 0.01) : 0, p = (h, m) => {
      const y = Buffer.byteLength(h);
      s.bytesSeen += y, s.bytes += y, s.isCaptured && this.emit("progress", s.bytesSeen), this.push(h) ? process.nextTick(m) : s.onReadCallback = () => {
        s.onReadCallback = null, process.nextTick(m);
      };
    }, f = (h, m) => {
      const y = Buffer.byteLength(h);
      let g = null, v = r, $, E = 0;
      if (i) {
        const O = Date.now();
        (!s.ts || (E = O - s.ts) >= l) && (s.ts = O, $ = o - s.bytes, s.bytes = $ < 0 ? -$ : 0, E = 0), $ = o - s.bytes;
      }
      if (i) {
        if ($ <= 0)
          return setTimeout(() => {
            m(null, h);
          }, l - E);
        $ < v && (v = $);
      }
      v && y > v && y - v > u && (g = h.subarray(v), h = h.subarray(0, v)), p(h, g ? () => {
        process.nextTick(m, null, g);
      } : m);
    };
    f(t, function h(m, y) {
      if (m)
        return a(m);
      y ? f(y, h) : a(null);
    });
  }
}
const { asyncIterator: eo } = Symbol, ol = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[eo] ? yield* e[eo]() : yield e;
}, Bm = _.ALPHABET.ALPHA_DIGIT + "-_", $n = new Uu(), ft = `\r
`, Hm = $n.encode(ft), Gm = 2;
class Km {
  constructor(t, n) {
    const { escapeName: a } = this.constructor, s = _.isString(n);
    let i = `Content-Disposition: form-data; name="${a(t)}"${!s && n.name ? `; filename="${a(n.name)}"` : ""}${ft}`;
    s ? n = $n.encode(String(n).replace(/\r?\n|\r\n?/g, ft)) : i += `Content-Type: ${n.type || "application/octet-stream"}${ft}`, this.headers = $n.encode(i + ft), this.contentLength = s ? n.byteLength : n.size, this.size = this.headers.byteLength + this.contentLength + Gm, this.name = t, this.value = n;
  }
  async *encode() {
    yield this.headers;
    const { value: t } = this;
    _.isTypedArray(t) ? yield t : yield* ol(t), yield Hm;
  }
  static escapeName(t) {
    return String(t).replace(/[\r\n"]/g, (n) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[n]);
  }
}
const Wm = (e, t, n) => {
  const {
    tag: a = "form-data-boundary",
    size: s = 25,
    boundary: i = a + "-" + _.generateString(s, Bm)
  } = n || {};
  if (!_.isFormData(e))
    throw TypeError("FormData instance required");
  if (i.length < 1 || i.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const r = $n.encode("--" + i + ft), l = $n.encode("--" + i + "--" + ft + ft);
  let c = l.byteLength;
  const o = Array.from(e.entries()).map(([p, f]) => {
    const h = new Km(p, f);
    return c += h.size, h;
  });
  c += r.byteLength * o.length, c = _.toFiniteNumber(c);
  const u = {
    "Content-Type": `multipart/form-data; boundary=${i}`
  };
  return Number.isFinite(c) && (u["Content-Length"] = c), t && t(u), qu.from(async function* () {
    for (const p of o)
      yield r, yield* p.encode();
    yield l;
  }());
};
class Xm extends Le.Transform {
  __transform(t, n, a) {
    this.push(t), a();
  }
  _transform(t, n, a) {
    if (t.length !== 0 && (this._transform = this.__transform, t[0] !== 120)) {
      const s = Buffer.alloc(2);
      s[0] = 120, s[1] = 156, this.push(s, n);
    }
    this.__transform(t, n, a);
  }
}
const Jm = (e, t) => _.isAsyncFn(e) ? function(...n) {
  const a = n.pop();
  e.apply(this, n).then((s) => {
    try {
      t ? a(null, ...t(s)) : a(null, s);
    } catch (i) {
      a(i);
    }
  }, a);
} : e;
function Ym(e, t) {
  e = e || 10;
  const n = new Array(e), a = new Array(e);
  let s = 0, i = 0, r;
  return t = t !== void 0 ? t : 1e3, function(c) {
    const o = Date.now(), u = a[i];
    r || (r = o), n[s] = c, a[s] = o;
    let p = i, f = 0;
    for (; p !== s; )
      f += n[p++], p = p % e;
    if (s = (s + 1) % e, s === i && (i = (i + 1) % e), o - r < t)
      return;
    const h = u && o - u;
    return h ? Math.round(f * 1e3 / h) : void 0;
  };
}
function Zm(e, t) {
  let n = 0, a = 1e3 / t, s, i;
  const r = (o, u = Date.now()) => {
    n = u, s = null, i && (clearTimeout(i), i = null), e.apply(null, o);
  };
  return [(...o) => {
    const u = Date.now(), p = u - n;
    p >= a ? r(o, u) : (s = o, i || (i = setTimeout(() => {
      i = null, r(s);
    }, a - p)));
  }, () => s && r(s)];
}
const Ht = (e, t, n = 3) => {
  let a = 0;
  const s = Ym(50, 250);
  return Zm((i) => {
    const r = i.loaded, l = i.lengthComputable ? i.total : void 0, c = r - a, o = s(c), u = r <= l;
    a = r;
    const p = {
      loaded: r,
      total: l,
      progress: l ? r / l : void 0,
      bytes: c,
      rate: o || void 0,
      estimated: o && l && u ? (l - r) / o : void 0,
      event: i,
      lengthComputable: l != null,
      [t ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, aa = (e, t) => {
  const n = e != null;
  return [(a) => t[0]({
    lengthComputable: n,
    total: e,
    loaded: a
  }), t[1]];
}, sa = (e) => (...t) => _.asap(() => e(...t)), to = {
  flush: vt.constants.Z_SYNC_FLUSH,
  finishFlush: vt.constants.Z_SYNC_FLUSH
}, Qm = {
  flush: vt.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: vt.constants.BROTLI_OPERATION_FLUSH
}, no = _.isFunction(vt.createBrotliDecompress), { http: ef, https: tf } = qm, nf = /https:?/, ao = ge.protocols.map((e) => e + ":"), so = (e, [t, n]) => (e.on("end", n).on("error", n), t);
function af(e, t) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, t);
}
function cl(e, t, n) {
  let a = t;
  if (!a && a !== !1) {
    const s = $m(n);
    s && (a = new URL(s));
  }
  if (a) {
    if (a.username && (a.auth = (a.username || "") + ":" + (a.password || "")), a.auth) {
      (a.auth.username || a.auth.password) && (a.auth = (a.auth.username || "") + ":" + (a.auth.password || ""));
      const i = Buffer.from(a.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + i;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const s = a.hostname || a.host;
    e.hostname = s, e.host = s, e.port = a.port, e.path = n, a.protocol && (e.protocol = a.protocol.includes(":") ? a.protocol : `${a.protocol}:`);
  }
  e.beforeRedirects.proxy = function(i) {
    cl(i, t, i.href);
  };
}
const sf = typeof process < "u" && _.kindOf(process) === "process", rf = (e) => new Promise((t, n) => {
  let a, s;
  const i = (c, o) => {
    s || (s = !0, a && a(c, o));
  }, r = (c) => {
    i(c), t(c);
  }, l = (c) => {
    i(c, !0), n(c);
  };
  e(r, l, (c) => a = c).catch(l);
}), of = ({ address: e, family: t }) => {
  if (!_.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: t || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, io = (e, t) => of(_.isObject(e) ? e : { address: e, family: t }), cf = sf && function(t) {
  return rf(async function(a, s, i) {
    let { data: r, lookup: l, family: c } = t;
    const { responseType: o, responseEncoding: u } = t, p = t.method.toUpperCase();
    let f, h = !1, m;
    if (l) {
      const T = Jm(l, (A) => _.isArray(A) ? A : [A]);
      l = (A, I, R) => {
        T(A, I, (b, S, w) => {
          if (b)
            return R(b);
          const d = _.isArray(S) ? S.map((x) => io(x)) : [io(S, w)];
          I.all ? R(b, d) : R(b, d[0].address, d[0].family);
        });
      };
    }
    const y = new Vu(), g = () => {
      t.cancelToken && t.cancelToken.unsubscribe(v), t.signal && t.signal.removeEventListener("abort", v), y.removeAllListeners();
    };
    i((T, A) => {
      f = !0, A && (h = !0, g());
    });
    function v(T) {
      y.emit("abort", !T || T.type ? new xt(null, t, m) : T);
    }
    y.once("abort", s), (t.cancelToken || t.signal) && (t.cancelToken && t.cancelToken.subscribe(v), t.signal && (t.signal.aborted ? v() : t.signal.addEventListener("abort", v)));
    const $ = ci(t.baseURL, t.url), E = new URL($, ge.hasBrowserEnv ? ge.origin : void 0), O = E.protocol || ao[0];
    if (O === "data:") {
      let T;
      if (p !== "GET")
        return Ut(a, s, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: t
        });
      try {
        T = Vm(t.url, o === "blob", {
          Blob: t.env && t.env.Blob
        });
      } catch (A) {
        throw D.from(A, D.ERR_BAD_REQUEST, t);
      }
      return o === "text" ? (T = T.toString(u), (!u || u === "utf8") && (T = _.stripBOM(T))) : o === "stream" && (T = Le.Readable.from(T)), Ut(a, s, {
        data: T,
        status: 200,
        statusText: "OK",
        headers: new be(),
        config: t
      });
    }
    if (ao.indexOf(O) === -1)
      return s(new D(
        "Unsupported protocol " + O,
        D.ERR_BAD_REQUEST,
        t
      ));
    const P = be.from(t.headers).normalize();
    P.set("User-Agent", "axios/" + na, !1);
    const { onUploadProgress: H, onDownloadProgress: W } = t, se = t.maxRate;
    let ce, he;
    if (_.isSpecCompliantForm(r)) {
      const T = P.getContentType(/boundary=([-_\w\d]{10,70})/i);
      r = Wm(r, (A) => {
        P.set(A);
      }, {
        tag: `axios-${na}-boundary`,
        boundary: T && T[1] || void 0
      });
    } else if (_.isFormData(r) && _.isFunction(r.getHeaders)) {
      if (P.set(r.getHeaders()), !P.hasContentLength())
        try {
          const T = await _n.promisify(r.getLength).call(r);
          Number.isFinite(T) && T >= 0 && P.setContentLength(T);
        } catch {
        }
    } else if (_.isBlob(r))
      r.size && P.setContentType(r.type || "application/octet-stream"), P.setContentLength(r.size || 0), r = Le.Readable.from(ol(r));
    else if (r && !_.isStream(r)) {
      if (!Buffer.isBuffer(r)) if (_.isArrayBuffer(r))
        r = Buffer.from(new Uint8Array(r));
      else if (_.isString(r))
        r = Buffer.from(r, "utf-8");
      else
        return s(new D(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          D.ERR_BAD_REQUEST,
          t
        ));
      if (P.setContentLength(r.length, !1), t.maxBodyLength > -1 && r.length > t.maxBodyLength)
        return s(new D(
          "Request body larger than maxBodyLength limit",
          D.ERR_BAD_REQUEST,
          t
        ));
    }
    const q = _.toFiniteNumber(P.getContentLength());
    _.isArray(se) ? (ce = se[0], he = se[1]) : ce = he = se, r && (H || ce) && (_.isStream(r) || (r = Le.Readable.from(r, { objectMode: !1 })), r = Le.pipeline([r, new Qr({
      maxRate: _.toFiniteNumber(ce)
    })], _.noop), H && r.on("progress", so(
      r,
      aa(
        q,
        Ht(sa(H), !1, 3)
      )
    )));
    let M;
    if (t.auth) {
      const T = t.auth.username || "", A = t.auth.password || "";
      M = T + ":" + A;
    }
    if (!M && E.username) {
      const T = E.username, A = E.password;
      M = T + ":" + A;
    }
    M && P.delete("authorization");
    let te;
    try {
      te = ii(
        E.pathname + E.search,
        t.params,
        t.paramsSerializer
      ).replace(/^\?/, "");
    } catch (T) {
      const A = new Error(T.message);
      return A.config = t, A.url = t.url, A.exists = !0, s(A);
    }
    P.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (no ? ", br" : ""),
      !1
    );
    const j = {
      path: te,
      method: p,
      headers: P.toJSON(),
      agents: { http: t.httpAgent, https: t.httpsAgent },
      auth: M,
      protocol: O,
      family: c,
      beforeRedirect: af,
      beforeRedirects: {}
    };
    !_.isUndefined(l) && (j.lookup = l), t.socketPath ? j.socketPath = t.socketPath : (j.hostname = E.hostname.startsWith("[") ? E.hostname.slice(1, -1) : E.hostname, j.port = E.port, cl(j, t.proxy, O + "//" + E.hostname + (E.port ? ":" + E.port : "") + j.path));
    let N;
    const F = nf.test(j.protocol);
    if (j.agent = F ? t.httpsAgent : t.httpAgent, t.transport ? N = t.transport : t.maxRedirects === 0 ? N = F ? ei : Qs : (t.maxRedirects && (j.maxRedirects = t.maxRedirects), t.beforeRedirect && (j.beforeRedirects.config = t.beforeRedirect), N = F ? tf : ef), t.maxBodyLength > -1 ? j.maxBodyLength = t.maxBodyLength : j.maxBodyLength = 1 / 0, t.insecureHTTPParser && (j.insecureHTTPParser = t.insecureHTTPParser), m = N.request(j, function(A) {
      if (m.destroyed) return;
      const I = [A], R = +A.headers["content-length"];
      if (W || he) {
        const x = new Qr({
          maxRate: _.toFiniteNumber(he)
        });
        W && x.on("progress", so(
          x,
          aa(
            R,
            Ht(sa(W), !0, 3)
          )
        )), I.push(x);
      }
      let b = A;
      const S = A.req || m;
      if (t.decompress !== !1 && A.headers["content-encoding"])
        switch ((p === "HEAD" || A.statusCode === 204) && delete A.headers["content-encoding"], (A.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            I.push(vt.createUnzip(to)), delete A.headers["content-encoding"];
            break;
          case "deflate":
            I.push(new Xm()), I.push(vt.createUnzip(to)), delete A.headers["content-encoding"];
            break;
          case "br":
            no && (I.push(vt.createBrotliDecompress(Qm)), delete A.headers["content-encoding"]);
        }
      b = I.length > 1 ? Le.pipeline(I, _.noop) : I[0];
      const w = Le.finished(b, () => {
        w(), g();
      }), d = {
        status: A.statusCode,
        statusText: A.statusMessage,
        headers: new be(A.headers),
        config: t,
        request: S
      };
      if (o === "stream")
        d.data = b, Ut(a, s, d);
      else {
        const x = [];
        let k = 0;
        b.on("data", function(L) {
          x.push(L), k += L.length, t.maxContentLength > -1 && k > t.maxContentLength && (h = !0, b.destroy(), s(new D(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            D.ERR_BAD_RESPONSE,
            t,
            S
          )));
        }), b.on("aborted", function() {
          if (h)
            return;
          const L = new D(
            "maxContentLength size of " + t.maxContentLength + " exceeded",
            D.ERR_BAD_RESPONSE,
            t,
            S
          );
          b.destroy(L), s(L);
        }), b.on("error", function(L) {
          m.destroyed || s(D.from(L, null, t, S));
        }), b.on("end", function() {
          try {
            let L = x.length === 1 ? x[0] : Buffer.concat(x);
            o !== "arraybuffer" && (L = L.toString(u), (!u || u === "utf8") && (L = _.stripBOM(L))), d.data = L;
          } catch (L) {
            return s(D.from(L, null, t, d.request, d));
          }
          Ut(a, s, d);
        });
      }
      y.once("abort", (x) => {
        b.destroyed || (b.emit("error", x), b.destroy());
      });
    }), y.once("abort", (T) => {
      s(T), m.destroy(T);
    }), m.on("error", function(A) {
      s(D.from(A, null, t, m));
    }), m.on("socket", function(A) {
      A.setKeepAlive(!0, 1e3 * 60);
    }), t.timeout) {
      const T = parseInt(t.timeout, 10);
      if (Number.isNaN(T)) {
        s(new D(
          "error trying to parse `config.timeout` to int",
          D.ERR_BAD_OPTION_VALUE,
          t,
          m
        ));
        return;
      }
      m.setTimeout(T, function() {
        if (f) return;
        let I = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
        const R = t.transitional || ri;
        t.timeoutErrorMessage && (I = t.timeoutErrorMessage), s(new D(
          I,
          R.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
          t,
          m
        )), v();
      });
    }
    if (_.isStream(r)) {
      let T = !1, A = !1;
      r.on("end", () => {
        T = !0;
      }), r.once("error", (I) => {
        A = !0, m.destroy(I);
      }), r.on("close", () => {
        !T && !A && v(new xt("Request stream has been aborted", t, m));
      }), r.pipe(m);
    } else
      m.end(r);
  });
}, lf = ge.hasStandardBrowserEnv ? (
  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  function() {
    const t = ge.navigator && /(msie|trident)/i.test(ge.navigator.userAgent), n = document.createElement("a");
    let a;
    function s(i) {
      let r = i;
      return t && (n.setAttribute("href", r), r = n.href), n.setAttribute("href", r), {
        href: n.href,
        protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
        host: n.host,
        search: n.search ? n.search.replace(/^\?/, "") : "",
        hash: n.hash ? n.hash.replace(/^#/, "") : "",
        hostname: n.hostname,
        port: n.port,
        pathname: n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname
      };
    }
    return a = s(window.location.href), function(r) {
      const l = _.isString(r) ? s(r) : r;
      return l.protocol === a.protocol && l.host === a.host;
    };
  }()
) : (
  // Non standard browser envs (web workers, react-native) lack needed support.
  /* @__PURE__ */ function() {
    return function() {
      return !0;
    };
  }()
), uf = ge.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, t, n, a, s, i) {
      const r = [e + "=" + encodeURIComponent(t)];
      _.isNumber(n) && r.push("expires=" + new Date(n).toGMTString()), _.isString(a) && r.push("path=" + a), _.isString(s) && r.push("domain=" + s), i === !0 && r.push("secure"), document.cookie = r.join("; ");
    },
    read(e) {
      const t = document.cookie.match(new RegExp("(^|;\\s*)(" + e + ")=([^;]*)"));
      return t ? decodeURIComponent(t[3]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5);
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), ro = (e) => e instanceof be ? { ...e } : e;
function jt(e, t) {
  t = t || {};
  const n = {};
  function a(o, u, p) {
    return _.isPlainObject(o) && _.isPlainObject(u) ? _.merge.call({ caseless: p }, o, u) : _.isPlainObject(u) ? _.merge({}, u) : _.isArray(u) ? u.slice() : u;
  }
  function s(o, u, p) {
    if (_.isUndefined(u)) {
      if (!_.isUndefined(o))
        return a(void 0, o, p);
    } else return a(o, u, p);
  }
  function i(o, u) {
    if (!_.isUndefined(u))
      return a(void 0, u);
  }
  function r(o, u) {
    if (_.isUndefined(u)) {
      if (!_.isUndefined(o))
        return a(void 0, o);
    } else return a(void 0, u);
  }
  function l(o, u, p) {
    if (p in t)
      return a(o, u);
    if (p in e)
      return a(void 0, o);
  }
  const c = {
    url: i,
    method: i,
    data: i,
    baseURL: r,
    transformRequest: r,
    transformResponse: r,
    paramsSerializer: r,
    timeout: r,
    timeoutMessage: r,
    withCredentials: r,
    withXSRFToken: r,
    adapter: r,
    responseType: r,
    xsrfCookieName: r,
    xsrfHeaderName: r,
    onUploadProgress: r,
    onDownloadProgress: r,
    decompress: r,
    maxContentLength: r,
    maxBodyLength: r,
    beforeRedirect: r,
    transport: r,
    httpAgent: r,
    httpsAgent: r,
    cancelToken: r,
    socketPath: r,
    responseEncoding: r,
    validateStatus: l,
    headers: (o, u) => s(ro(o), ro(u), !0)
  };
  return _.forEach(Object.keys(Object.assign({}, e, t)), function(u) {
    const p = c[u] || s, f = p(e[u], t[u], u);
    _.isUndefined(f) && p !== l || (n[u] = f);
  }), n;
}
const ll = (e) => {
  const t = jt({}, e);
  let { data: n, withXSRFToken: a, xsrfHeaderName: s, xsrfCookieName: i, headers: r, auth: l } = t;
  t.headers = r = be.from(r), t.url = ii(ci(t.baseURL, t.url), e.params, e.paramsSerializer), l && r.set(
    "Authorization",
    "Basic " + btoa((l.username || "") + ":" + (l.password ? unescape(encodeURIComponent(l.password)) : ""))
  );
  let c;
  if (_.isFormData(n)) {
    if (ge.hasStandardBrowserEnv || ge.hasStandardBrowserWebWorkerEnv)
      r.setContentType(void 0);
    else if ((c = r.getContentType()) !== !1) {
      const [o, ...u] = c ? c.split(";").map((p) => p.trim()).filter(Boolean) : [];
      r.setContentType([o || "multipart/form-data", ...u].join("; "));
    }
  }
  if (ge.hasStandardBrowserEnv && (a && _.isFunction(a) && (a = a(t)), a || a !== !1 && lf(t.url))) {
    const o = s && i && uf.read(i);
    o && r.set(s, o);
  }
  return t;
}, pf = typeof XMLHttpRequest < "u", df = pf && function(e) {
  return new Promise(function(n, a) {
    const s = ll(e);
    let i = s.data;
    const r = be.from(s.headers).normalize();
    let { responseType: l, onUploadProgress: c, onDownloadProgress: o } = s, u, p, f, h, m;
    function y() {
      h && h(), m && m(), s.cancelToken && s.cancelToken.unsubscribe(u), s.signal && s.signal.removeEventListener("abort", u);
    }
    let g = new XMLHttpRequest();
    g.open(s.method.toUpperCase(), s.url, !0), g.timeout = s.timeout;
    function v() {
      if (!g)
        return;
      const E = be.from(
        "getAllResponseHeaders" in g && g.getAllResponseHeaders()
      ), P = {
        data: !l || l === "text" || l === "json" ? g.responseText : g.response,
        status: g.status,
        statusText: g.statusText,
        headers: E,
        config: e,
        request: g
      };
      Ut(function(W) {
        n(W), y();
      }, function(W) {
        a(W), y();
      }, P), g = null;
    }
    "onloadend" in g ? g.onloadend = v : g.onreadystatechange = function() {
      !g || g.readyState !== 4 || g.status === 0 && !(g.responseURL && g.responseURL.indexOf("file:") === 0) || setTimeout(v);
    }, g.onabort = function() {
      g && (a(new D("Request aborted", D.ECONNABORTED, e, g)), g = null);
    }, g.onerror = function() {
      a(new D("Network Error", D.ERR_NETWORK, e, g)), g = null;
    }, g.ontimeout = function() {
      let O = s.timeout ? "timeout of " + s.timeout + "ms exceeded" : "timeout exceeded";
      const P = s.transitional || ri;
      s.timeoutErrorMessage && (O = s.timeoutErrorMessage), a(new D(
        O,
        P.clarifyTimeoutError ? D.ETIMEDOUT : D.ECONNABORTED,
        e,
        g
      )), g = null;
    }, i === void 0 && r.setContentType(null), "setRequestHeader" in g && _.forEach(r.toJSON(), function(O, P) {
      g.setRequestHeader(P, O);
    }), _.isUndefined(s.withCredentials) || (g.withCredentials = !!s.withCredentials), l && l !== "json" && (g.responseType = s.responseType), o && ([f, m] = Ht(o, !0), g.addEventListener("progress", f)), c && g.upload && ([p, h] = Ht(c), g.upload.addEventListener("progress", p), g.upload.addEventListener("loadend", h)), (s.cancelToken || s.signal) && (u = (E) => {
      g && (a(!E || E.type ? new xt(null, e, g) : E), g.abort(), g = null);
    }, s.cancelToken && s.cancelToken.subscribe(u), s.signal && (s.signal.aborted ? u() : s.signal.addEventListener("abort", u)));
    const $ = rl(s.url);
    if ($ && ge.protocols.indexOf($) === -1) {
      a(new D("Unsupported protocol " + $ + ":", D.ERR_BAD_REQUEST, e));
      return;
    }
    g.send(i || null);
  });
}, mf = (e, t) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (t || n) {
    let a = new AbortController(), s;
    const i = function(o) {
      if (!s) {
        s = !0, l();
        const u = o instanceof Error ? o : this.reason;
        a.abort(u instanceof D ? u : new xt(u instanceof Error ? u.message : u));
      }
    };
    let r = t && setTimeout(() => {
      r = null, i(new D(`timeout ${t} of ms exceeded`, D.ETIMEDOUT));
    }, t);
    const l = () => {
      e && (r && clearTimeout(r), r = null, e.forEach((o) => {
        o.unsubscribe ? o.unsubscribe(i) : o.removeEventListener("abort", i);
      }), e = null);
    };
    e.forEach((o) => o.addEventListener("abort", i));
    const { signal: c } = a;
    return c.unsubscribe = () => _.asap(l), c;
  }
}, ff = function* (e, t) {
  let n = e.byteLength;
  if (n < t) {
    yield e;
    return;
  }
  let a = 0, s;
  for (; a < n; )
    s = a + t, yield e.slice(a, s), a = s;
}, hf = async function* (e, t) {
  for await (const n of vf(e))
    yield* ff(n, t);
}, vf = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const t = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: a } = await t.read();
      if (n)
        break;
      yield a;
    }
  } finally {
    await t.cancel();
  }
}, oo = (e, t, n, a) => {
  const s = hf(e, t);
  let i = 0, r, l = (c) => {
    r || (r = !0, a && a(c));
  };
  return new ReadableStream({
    async pull(c) {
      try {
        const { done: o, value: u } = await s.next();
        if (o) {
          l(), c.close();
          return;
        }
        let p = u.byteLength;
        if (n) {
          let f = i += p;
          n(f);
        }
        c.enqueue(new Uint8Array(u));
      } catch (o) {
        throw l(o), o;
      }
    },
    cancel(c) {
      return l(c), s.return();
    }
  }, {
    highWaterMark: 2
  });
}, xa = typeof fetch == "function" && typeof Request == "function" && typeof Response == "function", ul = xa && typeof ReadableStream == "function", gf = xa && (typeof TextEncoder == "function" ? /* @__PURE__ */ ((e) => (t) => e.encode(t))(new TextEncoder()) : async (e) => new Uint8Array(await new Response(e).arrayBuffer())), pl = (e, ...t) => {
  try {
    return !!e(...t);
  } catch {
    return !1;
  }
}, xf = ul && pl(() => {
  let e = !1;
  const t = new Request(ge.origin, {
    body: new ReadableStream(),
    method: "POST",
    get duplex() {
      return e = !0, "half";
    }
  }).headers.has("Content-Type");
  return e && !t;
}), co = 64 * 1024, Is = ul && pl(() => _.isReadableStream(new Response("").body)), ia = {
  stream: Is && ((e) => e.body)
};
xa && ((e) => {
  ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
    !ia[t] && (ia[t] = _.isFunction(e[t]) ? (n) => n[t]() : (n, a) => {
      throw new D(`Response type '${t}' is not supported`, D.ERR_NOT_SUPPORT, a);
    });
  });
})(new Response());
const yf = async (e) => {
  if (e == null)
    return 0;
  if (_.isBlob(e))
    return e.size;
  if (_.isSpecCompliantForm(e))
    return (await new Request(ge.origin, {
      method: "POST",
      body: e
    }).arrayBuffer()).byteLength;
  if (_.isArrayBufferView(e) || _.isArrayBuffer(e))
    return e.byteLength;
  if (_.isURLSearchParams(e) && (e = e + ""), _.isString(e))
    return (await gf(e)).byteLength;
}, bf = async (e, t) => {
  const n = _.toFiniteNumber(e.getContentLength());
  return n ?? yf(t);
}, $f = xa && (async (e) => {
  let {
    url: t,
    method: n,
    data: a,
    signal: s,
    cancelToken: i,
    timeout: r,
    onDownloadProgress: l,
    onUploadProgress: c,
    responseType: o,
    headers: u,
    withCredentials: p = "same-origin",
    fetchOptions: f
  } = ll(e);
  o = o ? (o + "").toLowerCase() : "text";
  let h = mf([s, i && i.toAbortSignal()], r), m;
  const y = h && h.unsubscribe && (() => {
    h.unsubscribe();
  });
  let g;
  try {
    if (c && xf && n !== "get" && n !== "head" && (g = await bf(u, a)) !== 0) {
      let P = new Request(t, {
        method: "POST",
        body: a,
        duplex: "half"
      }), H;
      if (_.isFormData(a) && (H = P.headers.get("content-type")) && u.setContentType(H), P.body) {
        const [W, se] = aa(
          g,
          Ht(sa(c))
        );
        a = oo(P.body, co, W, se);
      }
    }
    _.isString(p) || (p = p ? "include" : "omit");
    const v = "credentials" in Request.prototype;
    m = new Request(t, {
      ...f,
      signal: h,
      method: n.toUpperCase(),
      headers: u.normalize().toJSON(),
      body: a,
      duplex: "half",
      credentials: v ? p : void 0
    });
    let $ = await fetch(m);
    const E = Is && (o === "stream" || o === "response");
    if (Is && (l || E && y)) {
      const P = {};
      ["status", "statusText", "headers"].forEach((ce) => {
        P[ce] = $[ce];
      });
      const H = _.toFiniteNumber($.headers.get("content-length")), [W, se] = l && aa(
        H,
        Ht(sa(l), !0)
      ) || [];
      $ = new Response(
        oo($.body, co, W, () => {
          se && se(), y && y();
        }),
        P
      );
    }
    o = o || "text";
    let O = await ia[_.findKey(ia, o) || "text"]($, e);
    return !E && y && y(), await new Promise((P, H) => {
      Ut(P, H, {
        data: O,
        headers: be.from($.headers),
        status: $.status,
        statusText: $.statusText,
        config: e,
        request: m
      });
    });
  } catch (v) {
    throw y && y(), v && v.name === "TypeError" && /fetch/i.test(v.message) ? Object.assign(
      new D("Network Error", D.ERR_NETWORK, e, m),
      {
        cause: v.cause || v
      }
    ) : D.from(v, v && v.code, e, m);
  }
}), Cs = {
  http: cf,
  xhr: df,
  fetch: $f
};
_.forEach(Cs, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const lo = (e) => `- ${e}`, wf = (e) => _.isFunction(e) || e === null || e === !1, dl = {
  getAdapter: (e) => {
    e = _.isArray(e) ? e : [e];
    const { length: t } = e;
    let n, a;
    const s = {};
    for (let i = 0; i < t; i++) {
      n = e[i];
      let r;
      if (a = n, !wf(n) && (a = Cs[(r = String(n)).toLowerCase()], a === void 0))
        throw new D(`Unknown adapter '${r}'`);
      if (a)
        break;
      s[r || "#" + i] = a;
    }
    if (!a) {
      const i = Object.entries(s).map(
        ([l, c]) => `adapter ${l} ` + (c === !1 ? "is not supported by the environment" : "is not available in the build")
      );
      let r = t ? i.length > 1 ? `since :
` + i.map(lo).join(`
`) : " " + lo(i[0]) : "as no adapter specified";
      throw new D(
        "There is no suitable adapter to dispatch the request " + r,
        "ERR_NOT_SUPPORT"
      );
    }
    return a;
  },
  adapters: Cs
};
function us(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new xt(null, e);
}
function uo(e) {
  return us(e), e.headers = be.from(e.headers), e.data = as.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), dl.getAdapter(e.adapter || Rn.adapter)(e).then(function(a) {
    return us(e), a.data = as.call(
      e,
      e.transformResponse,
      a
    ), a.headers = be.from(a.headers), a;
  }, function(a) {
    return el(a) || (us(e), a && a.response && (a.response.data = as.call(
      e,
      e.transformResponse,
      a.response
    ), a.response.headers = be.from(a.response.headers))), Promise.reject(a);
  });
}
const gi = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, t) => {
  gi[e] = function(a) {
    return typeof a === e || "a" + (t < 1 ? "n " : " ") + e;
  };
});
const po = {};
gi.transitional = function(t, n, a) {
  function s(i, r) {
    return "[Axios v" + na + "] Transitional option '" + i + "'" + r + (a ? ". " + a : "");
  }
  return (i, r, l) => {
    if (t === !1)
      throw new D(
        s(r, " has been removed" + (n ? " in " + n : "")),
        D.ERR_DEPRECATED
      );
    return n && !po[r] && (po[r] = !0, console.warn(
      s(
        r,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), t ? t(i, r, l) : !0;
  };
};
function _f(e, t, n) {
  if (typeof e != "object")
    throw new D("options must be an object", D.ERR_BAD_OPTION_VALUE);
  const a = Object.keys(e);
  let s = a.length;
  for (; s-- > 0; ) {
    const i = a[s], r = t[i];
    if (r) {
      const l = e[i], c = l === void 0 || r(l, i, e);
      if (c !== !0)
        throw new D("option " + i + " must be " + c, D.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new D("Unknown option " + i, D.ERR_BAD_OPTION);
  }
}
const Ls = {
  assertOptions: _f,
  validators: gi
}, it = Ls.validators;
class Rt {
  constructor(t) {
    this.defaults = t, this.interceptors = {
      request: new Br(),
      response: new Br()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (a) {
      if (a instanceof Error) {
        let s;
        Error.captureStackTrace ? Error.captureStackTrace(s = {}) : s = new Error();
        const i = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          a.stack ? i && !String(a.stack).endsWith(i.replace(/^.+\n.+\n/, "")) && (a.stack += `
` + i) : a.stack = i;
        } catch {
        }
      }
      throw a;
    }
  }
  _request(t, n) {
    typeof t == "string" ? (n = n || {}, n.url = t) : n = t || {}, n = jt(this.defaults, n);
    const { transitional: a, paramsSerializer: s, headers: i } = n;
    a !== void 0 && Ls.assertOptions(a, {
      silentJSONParsing: it.transitional(it.boolean),
      forcedJSONParsing: it.transitional(it.boolean),
      clarifyTimeoutError: it.transitional(it.boolean)
    }, !1), s != null && (_.isFunction(s) ? n.paramsSerializer = {
      serialize: s
    } : Ls.assertOptions(s, {
      encode: it.function,
      serialize: it.function
    }, !0)), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let r = i && _.merge(
      i.common,
      i[n.method]
    );
    i && _.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (m) => {
        delete i[m];
      }
    ), n.headers = be.concat(r, i);
    const l = [];
    let c = !0;
    this.interceptors.request.forEach(function(y) {
      typeof y.runWhen == "function" && y.runWhen(n) === !1 || (c = c && y.synchronous, l.unshift(y.fulfilled, y.rejected));
    });
    const o = [];
    this.interceptors.response.forEach(function(y) {
      o.push(y.fulfilled, y.rejected);
    });
    let u, p = 0, f;
    if (!c) {
      const m = [uo.bind(this), void 0];
      for (m.unshift.apply(m, l), m.push.apply(m, o), f = m.length, u = Promise.resolve(n); p < f; )
        u = u.then(m[p++], m[p++]);
      return u;
    }
    f = l.length;
    let h = n;
    for (p = 0; p < f; ) {
      const m = l[p++], y = l[p++];
      try {
        h = m(h);
      } catch (g) {
        y.call(this, g);
        break;
      }
    }
    try {
      u = uo.call(this, h);
    } catch (m) {
      return Promise.reject(m);
    }
    for (p = 0, f = o.length; p < f; )
      u = u.then(o[p++], o[p++]);
    return u;
  }
  getUri(t) {
    t = jt(this.defaults, t);
    const n = ci(t.baseURL, t.url);
    return ii(n, t.params, t.paramsSerializer);
  }
}
_.forEach(["delete", "get", "head", "options"], function(t) {
  Rt.prototype[t] = function(n, a) {
    return this.request(jt(a || {}, {
      method: t,
      url: n,
      data: (a || {}).data
    }));
  };
});
_.forEach(["post", "put", "patch"], function(t) {
  function n(a) {
    return function(i, r, l) {
      return this.request(jt(l || {}, {
        method: t,
        headers: a ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: i,
        data: r
      }));
    };
  }
  Rt.prototype[t] = n(), Rt.prototype[t + "Form"] = n(!0);
});
class xi {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(i) {
      n = i;
    });
    const a = this;
    this.promise.then((s) => {
      if (!a._listeners) return;
      let i = a._listeners.length;
      for (; i-- > 0; )
        a._listeners[i](s);
      a._listeners = null;
    }), this.promise.then = (s) => {
      let i;
      const r = new Promise((l) => {
        a.subscribe(l), i = l;
      }).then(s);
      return r.cancel = function() {
        a.unsubscribe(i);
      }, r;
    }, t(function(i, r, l) {
      a.reason || (a.reason = new xt(i, r, l), n(a.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : this._listeners = [t];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(t) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(), n = (a) => {
      t.abort(a);
    };
    return this.subscribe(n), t.signal.unsubscribe = () => this.unsubscribe(n), t.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let t;
    return {
      token: new xi(function(s) {
        t = s;
      }),
      cancel: t
    };
  }
}
function Ef(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function Sf(e) {
  return _.isObject(e) && e.isAxiosError === !0;
}
const Ds = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511
};
Object.entries(Ds).forEach(([e, t]) => {
  Ds[t] = e;
});
function ml(e) {
  const t = new Rt(e), n = Tc(Rt.prototype.request, t);
  return _.extend(n, Rt.prototype, t, { allOwnKeys: !0 }), _.extend(n, t, null, { allOwnKeys: !0 }), n.create = function(s) {
    return ml(jt(e, s));
  }, n;
}
const Y = ml(Rn);
Y.Axios = Rt;
Y.CanceledError = xt;
Y.CancelToken = xi;
Y.isCancel = el;
Y.VERSION = na;
Y.toFormData = ga;
Y.AxiosError = D;
Y.Cancel = Y.CanceledError;
Y.all = function(t) {
  return Promise.all(t);
};
Y.spread = Ef;
Y.isAxiosError = Sf;
Y.mergeConfig = jt;
Y.AxiosHeaders = be;
Y.formToJSON = (e) => Qc(_.isHTMLForm(e) ? new FormData(e) : e);
Y.getAdapter = dl.getAdapter;
Y.HttpStatusCode = Ds;
Y.default = Y;
const yi = "auth";
ee.handle(`${yi}-sign-up`, async (e, t) => ({ message: "Data saved", data: t }));
ee.handle(`${yi}-sign-in`, async (e, t) => (await Y.post(`${process.env.API_URL}auth/sign-in`, t)).data);
ee.handle(
  `${yi}-verify-session`,
  async (e, t) => (await Y.get(
    `${process.env.API_URL}auth/verify-session`,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
const fl = "user";
ee.handle(`${fl}-update`, async (e, t) => (await Y.put(
  `${process.env.API_URL}user/update`,
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
ee.handle(`${fl}-delete`, async (e, t) => (await Y.delete(`${process.env.API_URL}user/delete`, {
  headers: {
    Authorization: `Bearer ${t.token}`
  }
})).data);
const ya = "patient";
ee.handle(
  `${ya}-get-from-user`,
  async (e, t) => (await Y.get(
    `${process.env.API_URL}patient/get-from-user`,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
ee.handle(`${ya}-add`, async (e, t) => (await Y.post(
  `${process.env.API_URL}patient/create`,
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
ee.handle(`${ya}-update`, async (e, t) => {
  const { patient_id: n, ...a } = t.data;
  return (await Y.put(
    `${process.env.API_URL}patient/update/${n}`,
    a,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data;
});
ee.handle(`${ya}-delete`, async (e, t) => (await Y.delete(
  `${process.env.API_URL}patient/delete/${t.data.patient_id}`,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
const Tn = "appointment";
ee.handle(`${Tn}-add`, async (e, t) => (await Y.post(
  `${process.env.API_URL}appointment/create`,
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
ee.handle(`${Tn}-update`, async (e, t) => {
  const { appointment_id: n, ...a } = t.data;
  return (await Y.put(
    `${process.env.API_URL}appointment/update/${n}`,
    a,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data;
});
ee.handle(`${Tn}-delete`, async (e, t) => (await Y.delete(
  `${process.env.API_URL}appointment/delete/${t.data.appointment_id}`,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
ee.handle(
  `${Tn}-get-from-user`,
  async (e, t) => (await Y.get(
    `${process.env.API_URL}appointment/get-from-user`,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
ee.handle(
  `${Tn}-get-from-patient`,
  async (e, t) => (await Y.get(
    `${process.env.API_URL}appointment/get-from-patient/${t.patient_id}`,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
const ba = "consultation";
ee.handle(
  `${ba}-get-from-user`,
  async (e, t) => (await Y.get(
    `${process.env.API_URL}consultation/get-from-user`,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data
);
ee.handle(`${ba}-add`, async (e, t) => (await Y.post(
  `${process.env.API_URL}consultation/create`,
  t.data,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
ee.handle(`${ba}-update`, async (e, t) => {
  const { consultation_id: n, ...a } = t.data;
  return (await Y.put(
    `${process.env.API_URL}consultation/update/${n}`,
    a,
    {
      headers: {
        Authorization: `Bearer ${t.token}`
      }
    }
  )).data;
});
ee.handle(`${ba}-delete`, async (e, t) => (await Y.delete(
  `${process.env.API_URL}consultation/delete/${t.data.consultation_id}`,
  {
    headers: {
      Authorization: `Bearer ${t.token}`
    }
  }
)).data);
const Tt = (e) => {
  const t = typeof e;
  return e !== null && (t === "object" || t === "function");
}, ps = /* @__PURE__ */ new Set([
  "__proto__",
  "prototype",
  "constructor"
]), Rf = new Set("0123456789");
function $a(e) {
  const t = [];
  let n = "", a = "start", s = !1;
  for (const i of e)
    switch (i) {
      case "\\": {
        if (a === "index")
          throw new Error("Invalid character in an index");
        if (a === "indexEnd")
          throw new Error("Invalid character after an index");
        s && (n += i), a = "property", s = !s;
        break;
      }
      case ".": {
        if (a === "index")
          throw new Error("Invalid character in an index");
        if (a === "indexEnd") {
          a = "property";
          break;
        }
        if (s) {
          s = !1, n += i;
          break;
        }
        if (ps.has(n))
          return [];
        t.push(n), n = "", a = "property";
        break;
      }
      case "[": {
        if (a === "index")
          throw new Error("Invalid character in an index");
        if (a === "indexEnd") {
          a = "index";
          break;
        }
        if (s) {
          s = !1, n += i;
          break;
        }
        if (a === "property") {
          if (ps.has(n))
            return [];
          t.push(n), n = "";
        }
        a = "index";
        break;
      }
      case "]": {
        if (a === "index") {
          t.push(Number.parseInt(n, 10)), n = "", a = "indexEnd";
          break;
        }
        if (a === "indexEnd")
          throw new Error("Invalid character after an index");
      }
      default: {
        if (a === "index" && !Rf.has(i))
          throw new Error("Invalid character in an index");
        if (a === "indexEnd")
          throw new Error("Invalid character after an index");
        a === "start" && (a = "property"), s && (s = !1, n += "\\"), n += i;
      }
    }
  switch (s && (n += "\\"), a) {
    case "property": {
      if (ps.has(n))
        return [];
      t.push(n);
      break;
    }
    case "index":
      throw new Error("Index was not closed");
    case "start": {
      t.push("");
      break;
    }
  }
  return t;
}
function bi(e, t) {
  if (typeof t != "number" && Array.isArray(e)) {
    const n = Number.parseInt(t, 10);
    return Number.isInteger(n) && e[n] === e[t];
  }
  return !1;
}
function hl(e, t) {
  if (bi(e, t))
    throw new Error("Cannot use string index");
}
function kf(e, t, n) {
  if (!Tt(e) || typeof t != "string")
    return n === void 0 ? e : n;
  const a = $a(t);
  if (a.length === 0)
    return n;
  for (let s = 0; s < a.length; s++) {
    const i = a[s];
    if (bi(e, i) ? e = s === a.length - 1 ? void 0 : null : e = e[i], e == null) {
      if (s !== a.length - 1)
        return n;
      break;
    }
  }
  return e === void 0 ? n : e;
}
function mo(e, t, n) {
  if (!Tt(e) || typeof t != "string")
    return e;
  const a = e, s = $a(t);
  for (let i = 0; i < s.length; i++) {
    const r = s[i];
    hl(e, r), i === s.length - 1 ? e[r] = n : Tt(e[r]) || (e[r] = typeof s[i + 1] == "number" ? [] : {}), e = e[r];
  }
  return a;
}
function jf(e, t) {
  if (!Tt(e) || typeof t != "string")
    return !1;
  const n = $a(t);
  for (let a = 0; a < n.length; a++) {
    const s = n[a];
    if (hl(e, s), a === n.length - 1)
      return delete e[s], !0;
    if (e = e[s], !Tt(e))
      return !1;
  }
}
function Tf(e, t) {
  if (!Tt(e) || typeof t != "string")
    return !1;
  const n = $a(t);
  if (n.length === 0)
    return !1;
  for (const a of n) {
    if (!Tt(e) || !(a in e) || bi(e, a))
      return !1;
    e = e[a];
  }
  return !0;
}
const dt = da.homedir(), $i = da.tmpdir(), { env: Mt } = me, Of = (e) => {
  const t = J.join(dt, "Library");
  return {
    data: J.join(t, "Application Support", e),
    config: J.join(t, "Preferences", e),
    cache: J.join(t, "Caches", e),
    log: J.join(t, "Logs", e),
    temp: J.join($i, e)
  };
}, Pf = (e) => {
  const t = Mt.APPDATA || J.join(dt, "AppData", "Roaming"), n = Mt.LOCALAPPDATA || J.join(dt, "AppData", "Local");
  return {
    // Data/config/cache/log are invented by me as Windows isn't opinionated about this
    data: J.join(n, e, "Data"),
    config: J.join(t, e, "Config"),
    cache: J.join(n, e, "Cache"),
    log: J.join(n, e, "Log"),
    temp: J.join($i, e)
  };
}, Nf = (e) => {
  const t = J.basename(dt);
  return {
    data: J.join(Mt.XDG_DATA_HOME || J.join(dt, ".local", "share"), e),
    config: J.join(Mt.XDG_CONFIG_HOME || J.join(dt, ".config"), e),
    cache: J.join(Mt.XDG_CACHE_HOME || J.join(dt, ".cache"), e),
    // https://wiki.debian.org/XDGBaseDirectorySpecification#state
    log: J.join(Mt.XDG_STATE_HOME || J.join(dt, ".local", "state"), e),
    temp: J.join($i, t, e)
  };
};
function Af(e, { suffix: t = "nodejs" } = {}) {
  if (typeof e != "string")
    throw new TypeError(`Expected a string, got ${typeof e}`);
  return t && (e += `-${t}`), me.platform === "darwin" ? Of(e) : me.platform === "win32" ? Pf(e) : Nf(e);
}
const rt = (e, t) => function(...a) {
  return e.apply(void 0, a).catch(t);
}, Ye = (e, t) => function(...a) {
  try {
    return e.apply(void 0, a);
  } catch (s) {
    return t(s);
  }
}, If = me.getuid ? !me.getuid() : !1, Cf = 1e4, Pe = () => {
}, oe = {
  /* API */
  isChangeErrorOk: (e) => {
    if (!oe.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "ENOSYS" || !If && (t === "EINVAL" || t === "EPERM");
  },
  isNodeError: (e) => e instanceof Error,
  isRetriableError: (e) => {
    if (!oe.isNodeError(e))
      return !1;
    const { code: t } = e;
    return t === "EMFILE" || t === "ENFILE" || t === "EAGAIN" || t === "EBUSY" || t === "EACCESS" || t === "EACCES" || t === "EACCS" || t === "EPERM";
  },
  onChangeError: (e) => {
    if (!oe.isNodeError(e))
      throw e;
    if (!oe.isChangeErrorOk(e))
      throw e;
  }
};
class Lf {
  constructor() {
    this.interval = 25, this.intervalId = void 0, this.limit = Cf, this.queueActive = /* @__PURE__ */ new Set(), this.queueWaiting = /* @__PURE__ */ new Set(), this.init = () => {
      this.intervalId || (this.intervalId = setInterval(this.tick, this.interval));
    }, this.reset = () => {
      this.intervalId && (clearInterval(this.intervalId), delete this.intervalId);
    }, this.add = (t) => {
      this.queueWaiting.add(t), this.queueActive.size < this.limit / 2 ? this.tick() : this.init();
    }, this.remove = (t) => {
      this.queueWaiting.delete(t), this.queueActive.delete(t);
    }, this.schedule = () => new Promise((t) => {
      const n = () => this.remove(a), a = () => t(n);
      this.add(a);
    }), this.tick = () => {
      if (!(this.queueActive.size >= this.limit)) {
        if (!this.queueWaiting.size)
          return this.reset();
        for (const t of this.queueWaiting) {
          if (this.queueActive.size >= this.limit)
            break;
          this.queueWaiting.delete(t), this.queueActive.add(t), t();
        }
      }
    };
  }
}
const Df = new Lf(), ot = (e, t) => function(a) {
  return function s(...i) {
    return Df.schedule().then((r) => {
      const l = (o) => (r(), o), c = (o) => {
        if (r(), Date.now() >= a)
          throw o;
        if (t(o)) {
          const u = Math.round(100 * Math.random());
          return new Promise((f) => setTimeout(f, u)).then(() => s.apply(void 0, i));
        }
        throw o;
      };
      return e.apply(void 0, i).then(l, c);
    });
  };
}, ct = (e, t) => function(a) {
  return function s(...i) {
    try {
      return e.apply(void 0, i);
    } catch (r) {
      if (Date.now() > a)
        throw r;
      if (t(r))
        return s.apply(void 0, i);
      throw r;
    }
  };
}, _e = {
  attempt: {
    /* ASYNC */
    chmod: rt($e(K.chmod), oe.onChangeError),
    chown: rt($e(K.chown), oe.onChangeError),
    close: rt($e(K.close), Pe),
    fsync: rt($e(K.fsync), Pe),
    mkdir: rt($e(K.mkdir), Pe),
    realpath: rt($e(K.realpath), Pe),
    stat: rt($e(K.stat), Pe),
    unlink: rt($e(K.unlink), Pe),
    /* SYNC */
    chmodSync: Ye(K.chmodSync, oe.onChangeError),
    chownSync: Ye(K.chownSync, oe.onChangeError),
    closeSync: Ye(K.closeSync, Pe),
    existsSync: Ye(K.existsSync, Pe),
    fsyncSync: Ye(K.fsync, Pe),
    mkdirSync: Ye(K.mkdirSync, Pe),
    realpathSync: Ye(K.realpathSync, Pe),
    statSync: Ye(K.statSync, Pe),
    unlinkSync: Ye(K.unlinkSync, Pe)
  },
  retry: {
    /* ASYNC */
    close: ot($e(K.close), oe.isRetriableError),
    fsync: ot($e(K.fsync), oe.isRetriableError),
    open: ot($e(K.open), oe.isRetriableError),
    readFile: ot($e(K.readFile), oe.isRetriableError),
    rename: ot($e(K.rename), oe.isRetriableError),
    stat: ot($e(K.stat), oe.isRetriableError),
    write: ot($e(K.write), oe.isRetriableError),
    writeFile: ot($e(K.writeFile), oe.isRetriableError),
    /* SYNC */
    closeSync: ct(K.closeSync, oe.isRetriableError),
    fsyncSync: ct(K.fsyncSync, oe.isRetriableError),
    openSync: ct(K.openSync, oe.isRetriableError),
    readFileSync: ct(K.readFileSync, oe.isRetriableError),
    renameSync: ct(K.renameSync, oe.isRetriableError),
    statSync: ct(K.statSync, oe.isRetriableError),
    writeSync: ct(K.writeSync, oe.isRetriableError),
    writeFileSync: ct(K.writeFileSync, oe.isRetriableError)
  }
}, Ff = "utf8", fo = 438, zf = 511, Uf = {}, qf = da.userInfo().uid, Mf = da.userInfo().gid, Vf = 1e3, Bf = !!me.getuid;
me.getuid && me.getuid();
const ho = 128, Hf = (e) => e instanceof Error && "code" in e, vo = (e) => typeof e == "string", ds = (e) => e === void 0, Gf = me.platform === "linux", vl = me.platform === "win32", wi = ["SIGABRT", "SIGALRM", "SIGHUP", "SIGINT", "SIGTERM"];
vl || wi.push("SIGVTALRM", "SIGXCPU", "SIGXFSZ", "SIGUSR2", "SIGTRAP", "SIGSYS", "SIGQUIT", "SIGIOT");
Gf && wi.push("SIGIO", "SIGPOLL", "SIGPWR", "SIGSTKFLT", "SIGUNUSED");
class Kf {
  /* CONSTRUCTOR */
  constructor() {
    this.callbacks = /* @__PURE__ */ new Set(), this.exited = !1, this.exit = (t) => {
      if (!this.exited) {
        this.exited = !0;
        for (const n of this.callbacks)
          n();
        t && (vl && t !== "SIGINT" && t !== "SIGTERM" && t !== "SIGKILL" ? me.kill(me.pid, "SIGTERM") : me.kill(me.pid, t));
      }
    }, this.hook = () => {
      me.once("exit", () => this.exit());
      for (const t of wi)
        try {
          me.once(t, () => this.exit(t));
        } catch {
        }
    }, this.register = (t) => (this.callbacks.add(t), () => {
      this.callbacks.delete(t);
    }), this.hook();
  }
}
const Wf = new Kf(), Xf = Wf.register, Ee = {
  /* VARIABLES */
  store: {},
  /* API */
  create: (e) => {
    const t = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), s = `.tmp-${Date.now().toString().slice(-10)}${t}`;
    return `${e}${s}`;
  },
  get: (e, t, n = !0) => {
    const a = Ee.truncate(t(e));
    return a in Ee.store ? Ee.get(e, t, n) : (Ee.store[a] = n, [a, () => delete Ee.store[a]]);
  },
  purge: (e) => {
    Ee.store[e] && (delete Ee.store[e], _e.attempt.unlink(e));
  },
  purgeSync: (e) => {
    Ee.store[e] && (delete Ee.store[e], _e.attempt.unlinkSync(e));
  },
  purgeSyncAll: () => {
    for (const e in Ee.store)
      Ee.purgeSync(e);
  },
  truncate: (e) => {
    const t = J.basename(e);
    if (t.length <= ho)
      return e;
    const n = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(t);
    if (!n)
      return e;
    const a = t.length - ho;
    return `${e.slice(0, -t.length)}${n[1]}${n[2].slice(0, -a)}${n[3]}`;
  }
};
Xf(Ee.purgeSyncAll);
function gl(e, t, n = Uf) {
  if (vo(n))
    return gl(e, t, { encoding: n });
  const a = Date.now() + ((n.timeout ?? Vf) || -1);
  let s = null, i = null, r = null;
  try {
    const l = _e.attempt.realpathSync(e), c = !!l;
    e = l || e, [i, s] = Ee.get(e, n.tmpCreate || Ee.create, n.tmpPurge !== !1);
    const o = Bf && ds(n.chown), u = ds(n.mode);
    if (c && (o || u)) {
      const p = _e.attempt.statSync(e);
      p && (n = { ...n }, o && (n.chown = { uid: p.uid, gid: p.gid }), u && (n.mode = p.mode));
    }
    if (!c) {
      const p = J.dirname(e);
      _e.attempt.mkdirSync(p, {
        mode: zf,
        recursive: !0
      });
    }
    r = _e.retry.openSync(a)(i, "w", n.mode || fo), n.tmpCreated && n.tmpCreated(i), vo(t) ? _e.retry.writeSync(a)(r, t, 0, n.encoding || Ff) : ds(t) || _e.retry.writeSync(a)(r, t, 0, t.length, 0), n.fsync !== !1 && (n.fsyncWait !== !1 ? _e.retry.fsyncSync(a)(r) : _e.attempt.fsync(r)), _e.retry.closeSync(a)(r), r = null, n.chown && (n.chown.uid !== qf || n.chown.gid !== Mf) && _e.attempt.chownSync(i, n.chown.uid, n.chown.gid), n.mode && n.mode !== fo && _e.attempt.chmodSync(i, n.mode);
    try {
      _e.retry.renameSync(a)(i, e);
    } catch (p) {
      if (!Hf(p) || p.code !== "ENAMETOOLONG")
        throw p;
      _e.retry.renameSync(a)(i, Ee.truncate(e));
    }
    s(), i = null;
  } finally {
    r && _e.attempt.closeSync(r), i && Ee.purge(i);
  }
}
var Fs = { exports: {} }, _i = {}, De = {}, Gt = {}, On = {}, B = {}, wn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.regexpCode = e.getEsmExportName = e.getProperty = e.safeStringify = e.stringify = e.strConcat = e.addCodeArg = e.str = e._ = e.nil = e._Code = e.Name = e.IDENTIFIER = e._CodeOrName = void 0;
  class t {
  }
  e._CodeOrName = t, e.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class n extends t {
    constructor($) {
      if (super(), !e.IDENTIFIER.test($))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = $;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return !1;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  e.Name = n;
  class a extends t {
    constructor($) {
      super(), this._items = typeof $ == "string" ? [$] : $;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return !1;
      const $ = this._items[0];
      return $ === "" || $ === '""';
    }
    get str() {
      var $;
      return ($ = this._str) !== null && $ !== void 0 ? $ : this._str = this._items.reduce((E, O) => `${E}${O}`, "");
    }
    get names() {
      var $;
      return ($ = this._names) !== null && $ !== void 0 ? $ : this._names = this._items.reduce((E, O) => (O instanceof n && (E[O.str] = (E[O.str] || 0) + 1), E), {});
    }
  }
  e._Code = a, e.nil = new a("");
  function s(v, ...$) {
    const E = [v[0]];
    let O = 0;
    for (; O < $.length; )
      l(E, $[O]), E.push(v[++O]);
    return new a(E);
  }
  e._ = s;
  const i = new a("+");
  function r(v, ...$) {
    const E = [h(v[0])];
    let O = 0;
    for (; O < $.length; )
      E.push(i), l(E, $[O]), E.push(i, h(v[++O]));
    return c(E), new a(E);
  }
  e.str = r;
  function l(v, $) {
    $ instanceof a ? v.push(...$._items) : $ instanceof n ? v.push($) : v.push(p($));
  }
  e.addCodeArg = l;
  function c(v) {
    let $ = 1;
    for (; $ < v.length - 1; ) {
      if (v[$] === i) {
        const E = o(v[$ - 1], v[$ + 1]);
        if (E !== void 0) {
          v.splice($ - 1, 3, E);
          continue;
        }
        v[$++] = "+";
      }
      $++;
    }
  }
  function o(v, $) {
    if ($ === '""')
      return v;
    if (v === '""')
      return $;
    if (typeof v == "string")
      return $ instanceof n || v[v.length - 1] !== '"' ? void 0 : typeof $ != "string" ? `${v.slice(0, -1)}${$}"` : $[0] === '"' ? v.slice(0, -1) + $.slice(1) : void 0;
    if (typeof $ == "string" && $[0] === '"' && !(v instanceof n))
      return `"${v}${$.slice(1)}`;
  }
  function u(v, $) {
    return $.emptyStr() ? v : v.emptyStr() ? $ : r`${v}${$}`;
  }
  e.strConcat = u;
  function p(v) {
    return typeof v == "number" || typeof v == "boolean" || v === null ? v : h(Array.isArray(v) ? v.join(",") : v);
  }
  function f(v) {
    return new a(h(v));
  }
  e.stringify = f;
  function h(v) {
    return JSON.stringify(v).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  e.safeStringify = h;
  function m(v) {
    return typeof v == "string" && e.IDENTIFIER.test(v) ? new a(`.${v}`) : s`[${v}]`;
  }
  e.getProperty = m;
  function y(v) {
    if (typeof v == "string" && e.IDENTIFIER.test(v))
      return new a(`${v}`);
    throw new Error(`CodeGen: invalid export name: ${v}, use explicit $id name mapping`);
  }
  e.getEsmExportName = y;
  function g(v) {
    return new a(v.toString());
  }
  e.regexpCode = g;
})(wn);
var zs = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ValueScope = e.ValueScopeName = e.Scope = e.varKinds = e.UsedValueState = void 0;
  const t = wn;
  class n extends Error {
    constructor(o) {
      super(`CodeGen: "code" for ${o} not defined`), this.value = o.value;
    }
  }
  var a;
  (function(c) {
    c[c.Started = 0] = "Started", c[c.Completed = 1] = "Completed";
  })(a || (e.UsedValueState = a = {})), e.varKinds = {
    const: new t.Name("const"),
    let: new t.Name("let"),
    var: new t.Name("var")
  };
  class s {
    constructor({ prefixes: o, parent: u } = {}) {
      this._names = {}, this._prefixes = o, this._parent = u;
    }
    toName(o) {
      return o instanceof t.Name ? o : this.name(o);
    }
    name(o) {
      return new t.Name(this._newName(o));
    }
    _newName(o) {
      const u = this._names[o] || this._nameGroup(o);
      return `${o}${u.index++}`;
    }
    _nameGroup(o) {
      var u, p;
      if (!((p = (u = this._parent) === null || u === void 0 ? void 0 : u._prefixes) === null || p === void 0) && p.has(o) || this._prefixes && !this._prefixes.has(o))
        throw new Error(`CodeGen: prefix "${o}" is not allowed in this scope`);
      return this._names[o] = { prefix: o, index: 0 };
    }
  }
  e.Scope = s;
  class i extends t.Name {
    constructor(o, u) {
      super(u), this.prefix = o;
    }
    setValue(o, { property: u, itemIndex: p }) {
      this.value = o, this.scopePath = (0, t._)`.${new t.Name(u)}[${p}]`;
    }
  }
  e.ValueScopeName = i;
  const r = (0, t._)`\n`;
  class l extends s {
    constructor(o) {
      super(o), this._values = {}, this._scope = o.scope, this.opts = { ...o, _n: o.lines ? r : t.nil };
    }
    get() {
      return this._scope;
    }
    name(o) {
      return new i(o, this._newName(o));
    }
    value(o, u) {
      var p;
      if (u.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const f = this.toName(o), { prefix: h } = f, m = (p = u.key) !== null && p !== void 0 ? p : u.ref;
      let y = this._values[h];
      if (y) {
        const $ = y.get(m);
        if ($)
          return $;
      } else
        y = this._values[h] = /* @__PURE__ */ new Map();
      y.set(m, f);
      const g = this._scope[h] || (this._scope[h] = []), v = g.length;
      return g[v] = u.ref, f.setValue(u, { property: h, itemIndex: v }), f;
    }
    getValue(o, u) {
      const p = this._values[o];
      if (p)
        return p.get(u);
    }
    scopeRefs(o, u = this._values) {
      return this._reduceValues(u, (p) => {
        if (p.scopePath === void 0)
          throw new Error(`CodeGen: name "${p}" has no value`);
        return (0, t._)`${o}${p.scopePath}`;
      });
    }
    scopeCode(o = this._values, u, p) {
      return this._reduceValues(o, (f) => {
        if (f.value === void 0)
          throw new Error(`CodeGen: name "${f}" has no value`);
        return f.value.code;
      }, u, p);
    }
    _reduceValues(o, u, p = {}, f) {
      let h = t.nil;
      for (const m in o) {
        const y = o[m];
        if (!y)
          continue;
        const g = p[m] = p[m] || /* @__PURE__ */ new Map();
        y.forEach((v) => {
          if (g.has(v))
            return;
          g.set(v, a.Started);
          let $ = u(v);
          if ($) {
            const E = this.opts.es5 ? e.varKinds.var : e.varKinds.const;
            h = (0, t._)`${h}${E} ${v} = ${$};${this.opts._n}`;
          } else if ($ = f == null ? void 0 : f(v))
            h = (0, t._)`${h}${$}${this.opts._n}`;
          else
            throw new n(v);
          g.set(v, a.Completed);
        });
      }
      return h;
    }
  }
  e.ValueScope = l;
})(zs);
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.or = e.and = e.not = e.CodeGen = e.operators = e.varKinds = e.ValueScopeName = e.ValueScope = e.Scope = e.Name = e.regexpCode = e.stringify = e.getProperty = e.nil = e.strConcat = e.str = e._ = void 0;
  const t = wn, n = zs;
  var a = wn;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return a._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return a.str;
  } }), Object.defineProperty(e, "strConcat", { enumerable: !0, get: function() {
    return a.strConcat;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return a.nil;
  } }), Object.defineProperty(e, "getProperty", { enumerable: !0, get: function() {
    return a.getProperty;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return a.stringify;
  } }), Object.defineProperty(e, "regexpCode", { enumerable: !0, get: function() {
    return a.regexpCode;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return a.Name;
  } });
  var s = zs;
  Object.defineProperty(e, "Scope", { enumerable: !0, get: function() {
    return s.Scope;
  } }), Object.defineProperty(e, "ValueScope", { enumerable: !0, get: function() {
    return s.ValueScope;
  } }), Object.defineProperty(e, "ValueScopeName", { enumerable: !0, get: function() {
    return s.ValueScopeName;
  } }), Object.defineProperty(e, "varKinds", { enumerable: !0, get: function() {
    return s.varKinds;
  } }), e.operators = {
    GT: new t._Code(">"),
    GTE: new t._Code(">="),
    LT: new t._Code("<"),
    LTE: new t._Code("<="),
    EQ: new t._Code("==="),
    NEQ: new t._Code("!=="),
    NOT: new t._Code("!"),
    OR: new t._Code("||"),
    AND: new t._Code("&&"),
    ADD: new t._Code("+")
  };
  class i {
    optimizeNodes() {
      return this;
    }
    optimizeNames(d, x) {
      return this;
    }
  }
  class r extends i {
    constructor(d, x, k) {
      super(), this.varKind = d, this.name = x, this.rhs = k;
    }
    render({ es5: d, _n: x }) {
      const k = d ? n.varKinds.var : this.varKind, z = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${k} ${this.name}${z};` + x;
    }
    optimizeNames(d, x) {
      if (d[this.name.str])
        return this.rhs && (this.rhs = j(this.rhs, d, x)), this;
    }
    get names() {
      return this.rhs instanceof t._CodeOrName ? this.rhs.names : {};
    }
  }
  class l extends i {
    constructor(d, x, k) {
      super(), this.lhs = d, this.rhs = x, this.sideEffects = k;
    }
    render({ _n: d }) {
      return `${this.lhs} = ${this.rhs};` + d;
    }
    optimizeNames(d, x) {
      if (!(this.lhs instanceof t.Name && !d[this.lhs.str] && !this.sideEffects))
        return this.rhs = j(this.rhs, d, x), this;
    }
    get names() {
      const d = this.lhs instanceof t.Name ? {} : { ...this.lhs.names };
      return te(d, this.rhs);
    }
  }
  class c extends l {
    constructor(d, x, k, z) {
      super(d, k, z), this.op = x;
    }
    render({ _n: d }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + d;
    }
  }
  class o extends i {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `${this.label}:` + d;
    }
  }
  class u extends i {
    constructor(d) {
      super(), this.label = d, this.names = {};
    }
    render({ _n: d }) {
      return `break${this.label ? ` ${this.label}` : ""};` + d;
    }
  }
  class p extends i {
    constructor(d) {
      super(), this.error = d;
    }
    render({ _n: d }) {
      return `throw ${this.error};` + d;
    }
    get names() {
      return this.error.names;
    }
  }
  class f extends i {
    constructor(d) {
      super(), this.code = d;
    }
    render({ _n: d }) {
      return `${this.code};` + d;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(d, x) {
      return this.code = j(this.code, d, x), this;
    }
    get names() {
      return this.code instanceof t._CodeOrName ? this.code.names : {};
    }
  }
  class h extends i {
    constructor(d = []) {
      super(), this.nodes = d;
    }
    render(d) {
      return this.nodes.reduce((x, k) => x + k.render(d), "");
    }
    optimizeNodes() {
      const { nodes: d } = this;
      let x = d.length;
      for (; x--; ) {
        const k = d[x].optimizeNodes();
        Array.isArray(k) ? d.splice(x, 1, ...k) : k ? d[x] = k : d.splice(x, 1);
      }
      return d.length > 0 ? this : void 0;
    }
    optimizeNames(d, x) {
      const { nodes: k } = this;
      let z = k.length;
      for (; z--; ) {
        const L = k[z];
        L.optimizeNames(d, x) || (N(d, L.names), k.splice(z, 1));
      }
      return k.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((d, x) => M(d, x.names), {});
    }
  }
  class m extends h {
    render(d) {
      return "{" + d._n + super.render(d) + "}" + d._n;
    }
  }
  class y extends h {
  }
  class g extends m {
  }
  g.kind = "else";
  class v extends m {
    constructor(d, x) {
      super(x), this.condition = d;
    }
    render(d) {
      let x = `if(${this.condition})` + super.render(d);
      return this.else && (x += "else " + this.else.render(d)), x;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const d = this.condition;
      if (d === !0)
        return this.nodes;
      let x = this.else;
      if (x) {
        const k = x.optimizeNodes();
        x = this.else = Array.isArray(k) ? new g(k) : k;
      }
      if (x)
        return d === !1 ? x instanceof v ? x : x.nodes : this.nodes.length ? this : new v(F(d), x instanceof v ? [x] : x.nodes);
      if (!(d === !1 || !this.nodes.length))
        return this;
    }
    optimizeNames(d, x) {
      var k;
      if (this.else = (k = this.else) === null || k === void 0 ? void 0 : k.optimizeNames(d, x), !!(super.optimizeNames(d, x) || this.else))
        return this.condition = j(this.condition, d, x), this;
    }
    get names() {
      const d = super.names;
      return te(d, this.condition), this.else && M(d, this.else.names), d;
    }
  }
  v.kind = "if";
  class $ extends m {
  }
  $.kind = "for";
  class E extends $ {
    constructor(d) {
      super(), this.iteration = d;
    }
    render(d) {
      return `for(${this.iteration})` + super.render(d);
    }
    optimizeNames(d, x) {
      if (super.optimizeNames(d, x))
        return this.iteration = j(this.iteration, d, x), this;
    }
    get names() {
      return M(super.names, this.iteration.names);
    }
  }
  class O extends $ {
    constructor(d, x, k, z) {
      super(), this.varKind = d, this.name = x, this.from = k, this.to = z;
    }
    render(d) {
      const x = d.es5 ? n.varKinds.var : this.varKind, { name: k, from: z, to: L } = this;
      return `for(${x} ${k}=${z}; ${k}<${L}; ${k}++)` + super.render(d);
    }
    get names() {
      const d = te(super.names, this.from);
      return te(d, this.to);
    }
  }
  class P extends $ {
    constructor(d, x, k, z) {
      super(), this.loop = d, this.varKind = x, this.name = k, this.iterable = z;
    }
    render(d) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(d);
    }
    optimizeNames(d, x) {
      if (super.optimizeNames(d, x))
        return this.iterable = j(this.iterable, d, x), this;
    }
    get names() {
      return M(super.names, this.iterable.names);
    }
  }
  class H extends m {
    constructor(d, x, k) {
      super(), this.name = d, this.args = x, this.async = k;
    }
    render(d) {
      return `${this.async ? "async " : ""}function ${this.name}(${this.args})` + super.render(d);
    }
  }
  H.kind = "func";
  class W extends h {
    render(d) {
      return "return " + super.render(d);
    }
  }
  W.kind = "return";
  class se extends m {
    render(d) {
      let x = "try" + super.render(d);
      return this.catch && (x += this.catch.render(d)), this.finally && (x += this.finally.render(d)), x;
    }
    optimizeNodes() {
      var d, x;
      return super.optimizeNodes(), (d = this.catch) === null || d === void 0 || d.optimizeNodes(), (x = this.finally) === null || x === void 0 || x.optimizeNodes(), this;
    }
    optimizeNames(d, x) {
      var k, z;
      return super.optimizeNames(d, x), (k = this.catch) === null || k === void 0 || k.optimizeNames(d, x), (z = this.finally) === null || z === void 0 || z.optimizeNames(d, x), this;
    }
    get names() {
      const d = super.names;
      return this.catch && M(d, this.catch.names), this.finally && M(d, this.finally.names), d;
    }
  }
  class ce extends m {
    constructor(d) {
      super(), this.error = d;
    }
    render(d) {
      return `catch(${this.error})` + super.render(d);
    }
  }
  ce.kind = "catch";
  class he extends m {
    render(d) {
      return "finally" + super.render(d);
    }
  }
  he.kind = "finally";
  class q {
    constructor(d, x = {}) {
      this._values = {}, this._blockStarts = [], this._constants = {}, this.opts = { ...x, _n: x.lines ? `
` : "" }, this._extScope = d, this._scope = new n.Scope({ parent: d }), this._nodes = [new y()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    // returns unique name in the internal scope
    name(d) {
      return this._scope.name(d);
    }
    // reserves unique name in the external scope
    scopeName(d) {
      return this._extScope.name(d);
    }
    // reserves unique name in the external scope and assigns value to it
    scopeValue(d, x) {
      const k = this._extScope.value(d, x);
      return (this._values[k.prefix] || (this._values[k.prefix] = /* @__PURE__ */ new Set())).add(k), k;
    }
    getScopeValue(d, x) {
      return this._extScope.getValue(d, x);
    }
    // return code that assigns values in the external scope to the names that are used internally
    // (same names that were returned by gen.scopeName or gen.scopeValue)
    scopeRefs(d) {
      return this._extScope.scopeRefs(d, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(d, x, k, z) {
      const L = this._scope.toName(x);
      return k !== void 0 && z && (this._constants[L.str] = k), this._leafNode(new r(d, L, k)), L;
    }
    // `const` declaration (`var` in es5 mode)
    const(d, x, k) {
      return this._def(n.varKinds.const, d, x, k);
    }
    // `let` declaration with optional assignment (`var` in es5 mode)
    let(d, x, k) {
      return this._def(n.varKinds.let, d, x, k);
    }
    // `var` declaration with optional assignment
    var(d, x, k) {
      return this._def(n.varKinds.var, d, x, k);
    }
    // assignment code
    assign(d, x, k) {
      return this._leafNode(new l(d, x, k));
    }
    // `+=` code
    add(d, x) {
      return this._leafNode(new c(d, e.operators.ADD, x));
    }
    // appends passed SafeExpr to code or executes Block
    code(d) {
      return typeof d == "function" ? d() : d !== t.nil && this._leafNode(new f(d)), this;
    }
    // returns code for object literal for the passed argument list of key-value pairs
    object(...d) {
      const x = ["{"];
      for (const [k, z] of d)
        x.length > 1 && x.push(","), x.push(k), (k !== z || this.opts.es5) && (x.push(":"), (0, t.addCodeArg)(x, z));
      return x.push("}"), new t._Code(x);
    }
    // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
    if(d, x, k) {
      if (this._blockNode(new v(d)), x && k)
        this.code(x).else().code(k).endIf();
      else if (x)
        this.code(x).endIf();
      else if (k)
        throw new Error('CodeGen: "else" body without "then" body');
      return this;
    }
    // `else if` clause - invalid without `if` or after `else` clauses
    elseIf(d) {
      return this._elseNode(new v(d));
    }
    // `else` clause - only valid after `if` or `else if` clauses
    else() {
      return this._elseNode(new g());
    }
    // end `if` statement (needed if gen.if was used only with condition)
    endIf() {
      return this._endBlockNode(v, g);
    }
    _for(d, x) {
      return this._blockNode(d), x && this.code(x).endFor(), this;
    }
    // a generic `for` clause (or statement if `forBody` is passed)
    for(d, x) {
      return this._for(new E(d), x);
    }
    // `for` statement for a range of values
    forRange(d, x, k, z, L = this.opts.es5 ? n.varKinds.var : n.varKinds.let) {
      const ne = this._scope.toName(d);
      return this._for(new O(L, ne, x, k), () => z(ne));
    }
    // `for-of` statement (in es5 mode replace with a normal for loop)
    forOf(d, x, k, z = n.varKinds.const) {
      const L = this._scope.toName(d);
      if (this.opts.es5) {
        const ne = x instanceof t.Name ? x : this.var("_arr", x);
        return this.forRange("_i", 0, (0, t._)`${ne}.length`, (Q) => {
          this.var(L, (0, t._)`${ne}[${Q}]`), k(L);
        });
      }
      return this._for(new P("of", z, L, x), () => k(L));
    }
    // `for-in` statement.
    // With option `ownProperties` replaced with a `for-of` loop for object keys
    forIn(d, x, k, z = this.opts.es5 ? n.varKinds.var : n.varKinds.const) {
      if (this.opts.ownProperties)
        return this.forOf(d, (0, t._)`Object.keys(${x})`, k);
      const L = this._scope.toName(d);
      return this._for(new P("in", z, L, x), () => k(L));
    }
    // end `for` loop
    endFor() {
      return this._endBlockNode($);
    }
    // `label` statement
    label(d) {
      return this._leafNode(new o(d));
    }
    // `break` statement
    break(d) {
      return this._leafNode(new u(d));
    }
    // `return` statement
    return(d) {
      const x = new W();
      if (this._blockNode(x), this.code(d), x.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(W);
    }
    // `try` statement
    try(d, x, k) {
      if (!x && !k)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const z = new se();
      if (this._blockNode(z), this.code(d), x) {
        const L = this.name("e");
        this._currNode = z.catch = new ce(L), x(L);
      }
      return k && (this._currNode = z.finally = new he(), this.code(k)), this._endBlockNode(ce, he);
    }
    // `throw` statement
    throw(d) {
      return this._leafNode(new p(d));
    }
    // start self-balancing block
    block(d, x) {
      return this._blockStarts.push(this._nodes.length), d && this.code(d).endBlock(x), this;
    }
    // end the current self-balancing block
    endBlock(d) {
      const x = this._blockStarts.pop();
      if (x === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const k = this._nodes.length - x;
      if (k < 0 || d !== void 0 && k !== d)
        throw new Error(`CodeGen: wrong number of nodes: ${k} vs ${d} expected`);
      return this._nodes.length = x, this;
    }
    // `function` heading (or definition if funcBody is passed)
    func(d, x = t.nil, k, z) {
      return this._blockNode(new H(d, x, k)), z && this.code(z).endFunc(), this;
    }
    // end function definition
    endFunc() {
      return this._endBlockNode(H);
    }
    optimize(d = 1) {
      for (; d-- > 0; )
        this._root.optimizeNodes(), this._root.optimizeNames(this._root.names, this._constants);
    }
    _leafNode(d) {
      return this._currNode.nodes.push(d), this;
    }
    _blockNode(d) {
      this._currNode.nodes.push(d), this._nodes.push(d);
    }
    _endBlockNode(d, x) {
      const k = this._currNode;
      if (k instanceof d || x && k instanceof x)
        return this._nodes.pop(), this;
      throw new Error(`CodeGen: not in block "${x ? `${d.kind}/${x.kind}` : d.kind}"`);
    }
    _elseNode(d) {
      const x = this._currNode;
      if (!(x instanceof v))
        throw new Error('CodeGen: "else" without "if"');
      return this._currNode = x.else = d, this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const d = this._nodes;
      return d[d.length - 1];
    }
    set _currNode(d) {
      const x = this._nodes;
      x[x.length - 1] = d;
    }
  }
  e.CodeGen = q;
  function M(w, d) {
    for (const x in d)
      w[x] = (w[x] || 0) + (d[x] || 0);
    return w;
  }
  function te(w, d) {
    return d instanceof t._CodeOrName ? M(w, d.names) : w;
  }
  function j(w, d, x) {
    if (w instanceof t.Name)
      return k(w);
    if (!z(w))
      return w;
    return new t._Code(w._items.reduce((L, ne) => (ne instanceof t.Name && (ne = k(ne)), ne instanceof t._Code ? L.push(...ne._items) : L.push(ne), L), []));
    function k(L) {
      const ne = x[L.str];
      return ne === void 0 || d[L.str] !== 1 ? L : (delete d[L.str], ne);
    }
    function z(L) {
      return L instanceof t._Code && L._items.some((ne) => ne instanceof t.Name && d[ne.str] === 1 && x[ne.str] !== void 0);
    }
  }
  function N(w, d) {
    for (const x in d)
      w[x] = (w[x] || 0) - (d[x] || 0);
  }
  function F(w) {
    return typeof w == "boolean" || typeof w == "number" || w === null ? !w : (0, t._)`!${S(w)}`;
  }
  e.not = F;
  const T = b(e.operators.AND);
  function A(...w) {
    return w.reduce(T);
  }
  e.and = A;
  const I = b(e.operators.OR);
  function R(...w) {
    return w.reduce(I);
  }
  e.or = R;
  function b(w) {
    return (d, x) => d === t.nil ? x : x === t.nil ? d : (0, t._)`${S(d)} ${w} ${S(x)}`;
  }
  function S(w) {
    return w instanceof t.Name ? w : (0, t._)`(${w})`;
  }
})(B);
var C = {};
Object.defineProperty(C, "__esModule", { value: !0 });
C.checkStrictMode = C.getErrorPath = C.Type = C.useFunc = C.setEvaluated = C.evaluatedPropsToName = C.mergeEvaluated = C.eachItem = C.unescapeJsonPointer = C.escapeJsonPointer = C.escapeFragment = C.unescapeFragment = C.schemaRefOrVal = C.schemaHasRulesButRef = C.schemaHasRules = C.checkUnknownRules = C.alwaysValidSchema = C.toHash = void 0;
const ae = B, Jf = wn;
function Yf(e) {
  const t = {};
  for (const n of e)
    t[n] = !0;
  return t;
}
C.toHash = Yf;
function Zf(e, t) {
  return typeof t == "boolean" ? t : Object.keys(t).length === 0 ? !0 : (xl(e, t), !yl(t, e.self.RULES.all));
}
C.alwaysValidSchema = Zf;
function xl(e, t = e.schema) {
  const { opts: n, self: a } = e;
  if (!n.strictSchema || typeof t == "boolean")
    return;
  const s = a.RULES.keywords;
  for (const i in t)
    s[i] || wl(e, `unknown keyword: "${i}"`);
}
C.checkUnknownRules = xl;
function yl(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t[n])
      return !0;
  return !1;
}
C.schemaHasRules = yl;
function Qf(e, t) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (n !== "$ref" && t.all[n])
      return !0;
  return !1;
}
C.schemaHasRulesButRef = Qf;
function eh({ topSchemaRef: e, schemaPath: t }, n, a, s) {
  if (!s) {
    if (typeof n == "number" || typeof n == "boolean")
      return n;
    if (typeof n == "string")
      return (0, ae._)`${n}`;
  }
  return (0, ae._)`${e}${t}${(0, ae.getProperty)(a)}`;
}
C.schemaRefOrVal = eh;
function th(e) {
  return bl(decodeURIComponent(e));
}
C.unescapeFragment = th;
function nh(e) {
  return encodeURIComponent(Ei(e));
}
C.escapeFragment = nh;
function Ei(e) {
  return typeof e == "number" ? `${e}` : e.replace(/~/g, "~0").replace(/\//g, "~1");
}
C.escapeJsonPointer = Ei;
function bl(e) {
  return e.replace(/~1/g, "/").replace(/~0/g, "~");
}
C.unescapeJsonPointer = bl;
function ah(e, t) {
  if (Array.isArray(e))
    for (const n of e)
      t(n);
  else
    t(e);
}
C.eachItem = ah;
function go({ mergeNames: e, mergeToName: t, mergeValues: n, resultToName: a }) {
  return (s, i, r, l) => {
    const c = r === void 0 ? i : r instanceof ae.Name ? (i instanceof ae.Name ? e(s, i, r) : t(s, i, r), r) : i instanceof ae.Name ? (t(s, r, i), i) : n(i, r);
    return l === ae.Name && !(c instanceof ae.Name) ? a(s, c) : c;
  };
}
C.mergeEvaluated = {
  props: go({
    mergeNames: (e, t, n) => e.if((0, ae._)`${n} !== true && ${t} !== undefined`, () => {
      e.if((0, ae._)`${t} === true`, () => e.assign(n, !0), () => e.assign(n, (0, ae._)`${n} || {}`).code((0, ae._)`Object.assign(${n}, ${t})`));
    }),
    mergeToName: (e, t, n) => e.if((0, ae._)`${n} !== true`, () => {
      t === !0 ? e.assign(n, !0) : (e.assign(n, (0, ae._)`${n} || {}`), Si(e, n, t));
    }),
    mergeValues: (e, t) => e === !0 ? !0 : { ...e, ...t },
    resultToName: $l
  }),
  items: go({
    mergeNames: (e, t, n) => e.if((0, ae._)`${n} !== true && ${t} !== undefined`, () => e.assign(n, (0, ae._)`${t} === true ? true : ${n} > ${t} ? ${n} : ${t}`)),
    mergeToName: (e, t, n) => e.if((0, ae._)`${n} !== true`, () => e.assign(n, t === !0 ? !0 : (0, ae._)`${n} > ${t} ? ${n} : ${t}`)),
    mergeValues: (e, t) => e === !0 ? !0 : Math.max(e, t),
    resultToName: (e, t) => e.var("items", t)
  })
};
function $l(e, t) {
  if (t === !0)
    return e.var("props", !0);
  const n = e.var("props", (0, ae._)`{}`);
  return t !== void 0 && Si(e, n, t), n;
}
C.evaluatedPropsToName = $l;
function Si(e, t, n) {
  Object.keys(n).forEach((a) => e.assign((0, ae._)`${t}${(0, ae.getProperty)(a)}`, !0));
}
C.setEvaluated = Si;
const xo = {};
function sh(e, t) {
  return e.scopeValue("func", {
    ref: t,
    code: xo[t.code] || (xo[t.code] = new Jf._Code(t.code))
  });
}
C.useFunc = sh;
var Us;
(function(e) {
  e[e.Num = 0] = "Num", e[e.Str = 1] = "Str";
})(Us || (C.Type = Us = {}));
function ih(e, t, n) {
  if (e instanceof ae.Name) {
    const a = t === Us.Num;
    return n ? a ? (0, ae._)`"[" + ${e} + "]"` : (0, ae._)`"['" + ${e} + "']"` : a ? (0, ae._)`"/" + ${e}` : (0, ae._)`"/" + ${e}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
  }
  return n ? (0, ae.getProperty)(e).toString() : "/" + Ei(e);
}
C.getErrorPath = ih;
function wl(e, t, n = e.opts.strictSchema) {
  if (n) {
    if (t = `strict mode: ${t}`, n === !0)
      throw new Error(t);
    e.self.logger.warn(t);
  }
}
C.checkStrictMode = wl;
var Ie = {};
Object.defineProperty(Ie, "__esModule", { value: !0 });
const we = B, rh = {
  // validation function arguments
  data: new we.Name("data"),
  // data passed to validation function
  // args passed from referencing schema
  valCxt: new we.Name("valCxt"),
  // validation/data context - should not be used directly, it is destructured to the names below
  instancePath: new we.Name("instancePath"),
  parentData: new we.Name("parentData"),
  parentDataProperty: new we.Name("parentDataProperty"),
  rootData: new we.Name("rootData"),
  // root data - same as the data passed to the first/top validation function
  dynamicAnchors: new we.Name("dynamicAnchors"),
  // used to support recursiveRef and dynamicRef
  // function scoped variables
  vErrors: new we.Name("vErrors"),
  // null or array of validation errors
  errors: new we.Name("errors"),
  // counter of validation errors
  this: new we.Name("this"),
  // "globals"
  self: new we.Name("self"),
  scope: new we.Name("scope"),
  // JTD serialize/parse name for JSON string and position
  json: new we.Name("json"),
  jsonPos: new we.Name("jsonPos"),
  jsonLen: new we.Name("jsonLen"),
  jsonPart: new we.Name("jsonPart")
};
Ie.default = rh;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.extendErrors = e.resetErrorsCount = e.reportExtraError = e.reportError = e.keyword$DataError = e.keywordError = void 0;
  const t = B, n = C, a = Ie;
  e.keywordError = {
    message: ({ keyword: g }) => (0, t.str)`must pass "${g}" keyword validation`
  }, e.keyword$DataError = {
    message: ({ keyword: g, schemaType: v }) => v ? (0, t.str)`"${g}" keyword must be ${v} ($data)` : (0, t.str)`"${g}" keyword is invalid ($data)`
  };
  function s(g, v = e.keywordError, $, E) {
    const { it: O } = g, { gen: P, compositeRule: H, allErrors: W } = O, se = p(g, v, $);
    E ?? (H || W) ? c(P, se) : o(O, (0, t._)`[${se}]`);
  }
  e.reportError = s;
  function i(g, v = e.keywordError, $) {
    const { it: E } = g, { gen: O, compositeRule: P, allErrors: H } = E, W = p(g, v, $);
    c(O, W), P || H || o(E, a.default.vErrors);
  }
  e.reportExtraError = i;
  function r(g, v) {
    g.assign(a.default.errors, v), g.if((0, t._)`${a.default.vErrors} !== null`, () => g.if(v, () => g.assign((0, t._)`${a.default.vErrors}.length`, v), () => g.assign(a.default.vErrors, null)));
  }
  e.resetErrorsCount = r;
  function l({ gen: g, keyword: v, schemaValue: $, data: E, errsCount: O, it: P }) {
    if (O === void 0)
      throw new Error("ajv implementation error");
    const H = g.name("err");
    g.forRange("i", O, a.default.errors, (W) => {
      g.const(H, (0, t._)`${a.default.vErrors}[${W}]`), g.if((0, t._)`${H}.instancePath === undefined`, () => g.assign((0, t._)`${H}.instancePath`, (0, t.strConcat)(a.default.instancePath, P.errorPath))), g.assign((0, t._)`${H}.schemaPath`, (0, t.str)`${P.errSchemaPath}/${v}`), P.opts.verbose && (g.assign((0, t._)`${H}.schema`, $), g.assign((0, t._)`${H}.data`, E));
    });
  }
  e.extendErrors = l;
  function c(g, v) {
    const $ = g.const("err", v);
    g.if((0, t._)`${a.default.vErrors} === null`, () => g.assign(a.default.vErrors, (0, t._)`[${$}]`), (0, t._)`${a.default.vErrors}.push(${$})`), g.code((0, t._)`${a.default.errors}++`);
  }
  function o(g, v) {
    const { gen: $, validateName: E, schemaEnv: O } = g;
    O.$async ? $.throw((0, t._)`new ${g.ValidationError}(${v})`) : ($.assign((0, t._)`${E}.errors`, v), $.return(!1));
  }
  const u = {
    keyword: new t.Name("keyword"),
    schemaPath: new t.Name("schemaPath"),
    // also used in JTD errors
    params: new t.Name("params"),
    propertyName: new t.Name("propertyName"),
    message: new t.Name("message"),
    schema: new t.Name("schema"),
    parentSchema: new t.Name("parentSchema")
  };
  function p(g, v, $) {
    const { createErrors: E } = g.it;
    return E === !1 ? (0, t._)`{}` : f(g, v, $);
  }
  function f(g, v, $ = {}) {
    const { gen: E, it: O } = g, P = [
      h(O, $),
      m(g, $)
    ];
    return y(g, v, P), E.object(...P);
  }
  function h({ errorPath: g }, { instancePath: v }) {
    const $ = v ? (0, t.str)`${g}${(0, n.getErrorPath)(v, n.Type.Str)}` : g;
    return [a.default.instancePath, (0, t.strConcat)(a.default.instancePath, $)];
  }
  function m({ keyword: g, it: { errSchemaPath: v } }, { schemaPath: $, parentSchema: E }) {
    let O = E ? v : (0, t.str)`${v}/${g}`;
    return $ && (O = (0, t.str)`${O}${(0, n.getErrorPath)($, n.Type.Str)}`), [u.schemaPath, O];
  }
  function y(g, { params: v, message: $ }, E) {
    const { keyword: O, data: P, schemaValue: H, it: W } = g, { opts: se, propertyName: ce, topSchemaRef: he, schemaPath: q } = W;
    E.push([u.keyword, O], [u.params, typeof v == "function" ? v(g) : v || (0, t._)`{}`]), se.messages && E.push([u.message, typeof $ == "function" ? $(g) : $]), se.verbose && E.push([u.schema, H], [u.parentSchema, (0, t._)`${he}${q}`], [a.default.data, P]), ce && E.push([u.propertyName, ce]);
  }
})(On);
Object.defineProperty(Gt, "__esModule", { value: !0 });
Gt.boolOrEmptySchema = Gt.topBoolOrEmptySchema = void 0;
const oh = On, ch = B, lh = Ie, uh = {
  message: "boolean schema is false"
};
function ph(e) {
  const { gen: t, schema: n, validateName: a } = e;
  n === !1 ? _l(e, !1) : typeof n == "object" && n.$async === !0 ? t.return(lh.default.data) : (t.assign((0, ch._)`${a}.errors`, null), t.return(!0));
}
Gt.topBoolOrEmptySchema = ph;
function dh(e, t) {
  const { gen: n, schema: a } = e;
  a === !1 ? (n.var(t, !1), _l(e)) : n.var(t, !0);
}
Gt.boolOrEmptySchema = dh;
function _l(e, t) {
  const { gen: n, data: a } = e, s = {
    gen: n,
    keyword: "false schema",
    data: a,
    schema: !1,
    schemaCode: !1,
    schemaValue: !1,
    params: {},
    it: e
  };
  (0, oh.reportError)(s, uh, void 0, t);
}
var pe = {}, Ot = {};
Object.defineProperty(Ot, "__esModule", { value: !0 });
Ot.getRules = Ot.isJSONType = void 0;
const mh = ["string", "number", "integer", "boolean", "null", "object", "array"], fh = new Set(mh);
function hh(e) {
  return typeof e == "string" && fh.has(e);
}
Ot.isJSONType = hh;
function vh() {
  const e = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: { ...e, integer: !0, boolean: !0, null: !0 },
    rules: [{ rules: [] }, e.number, e.string, e.array, e.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
Ot.getRules = vh;
var et = {};
Object.defineProperty(et, "__esModule", { value: !0 });
et.shouldUseRule = et.shouldUseGroup = et.schemaHasRulesForType = void 0;
function gh({ schema: e, self: t }, n) {
  const a = t.RULES.types[n];
  return a && a !== !0 && El(e, a);
}
et.schemaHasRulesForType = gh;
function El(e, t) {
  return t.rules.some((n) => Sl(e, n));
}
et.shouldUseGroup = El;
function Sl(e, t) {
  var n;
  return e[t.keyword] !== void 0 || ((n = t.definition.implements) === null || n === void 0 ? void 0 : n.some((a) => e[a] !== void 0));
}
et.shouldUseRule = Sl;
Object.defineProperty(pe, "__esModule", { value: !0 });
pe.reportTypeError = pe.checkDataTypes = pe.checkDataType = pe.coerceAndCheckDataType = pe.getJSONTypes = pe.getSchemaTypes = pe.DataType = void 0;
const xh = Ot, yh = et, bh = On, G = B, Rl = C;
var Vt;
(function(e) {
  e[e.Correct = 0] = "Correct", e[e.Wrong = 1] = "Wrong";
})(Vt || (pe.DataType = Vt = {}));
function $h(e) {
  const t = kl(e.type);
  if (t.includes("null")) {
    if (e.nullable === !1)
      throw new Error("type: null contradicts nullable: false");
  } else {
    if (!t.length && e.nullable !== void 0)
      throw new Error('"nullable" cannot be used without "type"');
    e.nullable === !0 && t.push("null");
  }
  return t;
}
pe.getSchemaTypes = $h;
function kl(e) {
  const t = Array.isArray(e) ? e : e ? [e] : [];
  if (t.every(xh.isJSONType))
    return t;
  throw new Error("type must be JSONType or JSONType[]: " + t.join(","));
}
pe.getJSONTypes = kl;
function wh(e, t) {
  const { gen: n, data: a, opts: s } = e, i = _h(t, s.coerceTypes), r = t.length > 0 && !(i.length === 0 && t.length === 1 && (0, yh.schemaHasRulesForType)(e, t[0]));
  if (r) {
    const l = Ri(t, a, s.strictNumbers, Vt.Wrong);
    n.if(l, () => {
      i.length ? Eh(e, t, i) : ki(e);
    });
  }
  return r;
}
pe.coerceAndCheckDataType = wh;
const jl = /* @__PURE__ */ new Set(["string", "number", "integer", "boolean", "null"]);
function _h(e, t) {
  return t ? e.filter((n) => jl.has(n) || t === "array" && n === "array") : [];
}
function Eh(e, t, n) {
  const { gen: a, data: s, opts: i } = e, r = a.let("dataType", (0, G._)`typeof ${s}`), l = a.let("coerced", (0, G._)`undefined`);
  i.coerceTypes === "array" && a.if((0, G._)`${r} == 'object' && Array.isArray(${s}) && ${s}.length == 1`, () => a.assign(s, (0, G._)`${s}[0]`).assign(r, (0, G._)`typeof ${s}`).if(Ri(t, s, i.strictNumbers), () => a.assign(l, s))), a.if((0, G._)`${l} !== undefined`);
  for (const o of n)
    (jl.has(o) || o === "array" && i.coerceTypes === "array") && c(o);
  a.else(), ki(e), a.endIf(), a.if((0, G._)`${l} !== undefined`, () => {
    a.assign(s, l), Sh(e, l);
  });
  function c(o) {
    switch (o) {
      case "string":
        a.elseIf((0, G._)`${r} == "number" || ${r} == "boolean"`).assign(l, (0, G._)`"" + ${s}`).elseIf((0, G._)`${s} === null`).assign(l, (0, G._)`""`);
        return;
      case "number":
        a.elseIf((0, G._)`${r} == "boolean" || ${s} === null
              || (${r} == "string" && ${s} && ${s} == +${s})`).assign(l, (0, G._)`+${s}`);
        return;
      case "integer":
        a.elseIf((0, G._)`${r} === "boolean" || ${s} === null
              || (${r} === "string" && ${s} && ${s} == +${s} && !(${s} % 1))`).assign(l, (0, G._)`+${s}`);
        return;
      case "boolean":
        a.elseIf((0, G._)`${s} === "false" || ${s} === 0 || ${s} === null`).assign(l, !1).elseIf((0, G._)`${s} === "true" || ${s} === 1`).assign(l, !0);
        return;
      case "null":
        a.elseIf((0, G._)`${s} === "" || ${s} === 0 || ${s} === false`), a.assign(l, null);
        return;
      case "array":
        a.elseIf((0, G._)`${r} === "string" || ${r} === "number"
              || ${r} === "boolean" || ${s} === null`).assign(l, (0, G._)`[${s}]`);
    }
  }
}
function Sh({ gen: e, parentData: t, parentDataProperty: n }, a) {
  e.if((0, G._)`${t} !== undefined`, () => e.assign((0, G._)`${t}[${n}]`, a));
}
function qs(e, t, n, a = Vt.Correct) {
  const s = a === Vt.Correct ? G.operators.EQ : G.operators.NEQ;
  let i;
  switch (e) {
    case "null":
      return (0, G._)`${t} ${s} null`;
    case "array":
      i = (0, G._)`Array.isArray(${t})`;
      break;
    case "object":
      i = (0, G._)`${t} && typeof ${t} == "object" && !Array.isArray(${t})`;
      break;
    case "integer":
      i = r((0, G._)`!(${t} % 1) && !isNaN(${t})`);
      break;
    case "number":
      i = r();
      break;
    default:
      return (0, G._)`typeof ${t} ${s} ${e}`;
  }
  return a === Vt.Correct ? i : (0, G.not)(i);
  function r(l = G.nil) {
    return (0, G.and)((0, G._)`typeof ${t} == "number"`, l, n ? (0, G._)`isFinite(${t})` : G.nil);
  }
}
pe.checkDataType = qs;
function Ri(e, t, n, a) {
  if (e.length === 1)
    return qs(e[0], t, n, a);
  let s;
  const i = (0, Rl.toHash)(e);
  if (i.array && i.object) {
    const r = (0, G._)`typeof ${t} != "object"`;
    s = i.null ? r : (0, G._)`!${t} || ${r}`, delete i.null, delete i.array, delete i.object;
  } else
    s = G.nil;
  i.number && delete i.integer;
  for (const r in i)
    s = (0, G.and)(s, qs(r, t, n, a));
  return s;
}
pe.checkDataTypes = Ri;
const Rh = {
  message: ({ schema: e }) => `must be ${e}`,
  params: ({ schema: e, schemaValue: t }) => typeof e == "string" ? (0, G._)`{type: ${e}}` : (0, G._)`{type: ${t}}`
};
function ki(e) {
  const t = kh(e);
  (0, bh.reportError)(t, Rh);
}
pe.reportTypeError = ki;
function kh(e) {
  const { gen: t, data: n, schema: a } = e, s = (0, Rl.schemaRefOrVal)(e, a, "type");
  return {
    gen: t,
    keyword: "type",
    data: n,
    schema: a.type,
    schemaCode: s,
    schemaValue: s,
    parentSchema: a,
    params: {},
    it: e
  };
}
var wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
wa.assignDefaults = void 0;
const It = B, jh = C;
function Th(e, t) {
  const { properties: n, items: a } = e.schema;
  if (t === "object" && n)
    for (const s in n)
      yo(e, s, n[s].default);
  else t === "array" && Array.isArray(a) && a.forEach((s, i) => yo(e, i, s.default));
}
wa.assignDefaults = Th;
function yo(e, t, n) {
  const { gen: a, compositeRule: s, data: i, opts: r } = e;
  if (n === void 0)
    return;
  const l = (0, It._)`${i}${(0, It.getProperty)(t)}`;
  if (s) {
    (0, jh.checkStrictMode)(e, `default is ignored for: ${l}`);
    return;
  }
  let c = (0, It._)`${l} === undefined`;
  r.useDefaults === "empty" && (c = (0, It._)`${c} || ${l} === null || ${l} === ""`), a.if(c, (0, It._)`${l} = ${(0, It.stringify)(n)}`);
}
var We = {}, X = {};
Object.defineProperty(X, "__esModule", { value: !0 });
X.validateUnion = X.validateArray = X.usePattern = X.callValidateCode = X.schemaProperties = X.allSchemaProperties = X.noPropertyInData = X.propertyInData = X.isOwnProperty = X.hasPropFunc = X.reportMissingProp = X.checkMissingProp = X.checkReportMissingProp = void 0;
const ie = B, ji = C, lt = Ie, Oh = C;
function Ph(e, t) {
  const { gen: n, data: a, it: s } = e;
  n.if(Oi(n, a, t, s.opts.ownProperties), () => {
    e.setParams({ missingProperty: (0, ie._)`${t}` }, !0), e.error();
  });
}
X.checkReportMissingProp = Ph;
function Nh({ gen: e, data: t, it: { opts: n } }, a, s) {
  return (0, ie.or)(...a.map((i) => (0, ie.and)(Oi(e, t, i, n.ownProperties), (0, ie._)`${s} = ${i}`)));
}
X.checkMissingProp = Nh;
function Ah(e, t) {
  e.setParams({ missingProperty: t }, !0), e.error();
}
X.reportMissingProp = Ah;
function Tl(e) {
  return e.scopeValue("func", {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    ref: Object.prototype.hasOwnProperty,
    code: (0, ie._)`Object.prototype.hasOwnProperty`
  });
}
X.hasPropFunc = Tl;
function Ti(e, t, n) {
  return (0, ie._)`${Tl(e)}.call(${t}, ${n})`;
}
X.isOwnProperty = Ti;
function Ih(e, t, n, a) {
  const s = (0, ie._)`${t}${(0, ie.getProperty)(n)} !== undefined`;
  return a ? (0, ie._)`${s} && ${Ti(e, t, n)}` : s;
}
X.propertyInData = Ih;
function Oi(e, t, n, a) {
  const s = (0, ie._)`${t}${(0, ie.getProperty)(n)} === undefined`;
  return a ? (0, ie.or)(s, (0, ie.not)(Ti(e, t, n))) : s;
}
X.noPropertyInData = Oi;
function Ol(e) {
  return e ? Object.keys(e).filter((t) => t !== "__proto__") : [];
}
X.allSchemaProperties = Ol;
function Ch(e, t) {
  return Ol(t).filter((n) => !(0, ji.alwaysValidSchema)(e, t[n]));
}
X.schemaProperties = Ch;
function Lh({ schemaCode: e, data: t, it: { gen: n, topSchemaRef: a, schemaPath: s, errorPath: i }, it: r }, l, c, o) {
  const u = o ? (0, ie._)`${e}, ${t}, ${a}${s}` : t, p = [
    [lt.default.instancePath, (0, ie.strConcat)(lt.default.instancePath, i)],
    [lt.default.parentData, r.parentData],
    [lt.default.parentDataProperty, r.parentDataProperty],
    [lt.default.rootData, lt.default.rootData]
  ];
  r.opts.dynamicRef && p.push([lt.default.dynamicAnchors, lt.default.dynamicAnchors]);
  const f = (0, ie._)`${u}, ${n.object(...p)}`;
  return c !== ie.nil ? (0, ie._)`${l}.call(${c}, ${f})` : (0, ie._)`${l}(${f})`;
}
X.callValidateCode = Lh;
const Dh = (0, ie._)`new RegExp`;
function Fh({ gen: e, it: { opts: t } }, n) {
  const a = t.unicodeRegExp ? "u" : "", { regExp: s } = t.code, i = s(n, a);
  return e.scopeValue("pattern", {
    key: i.toString(),
    ref: i,
    code: (0, ie._)`${s.code === "new RegExp" ? Dh : (0, Oh.useFunc)(e, s)}(${n}, ${a})`
  });
}
X.usePattern = Fh;
function zh(e) {
  const { gen: t, data: n, keyword: a, it: s } = e, i = t.name("valid");
  if (s.allErrors) {
    const l = t.let("valid", !0);
    return r(() => t.assign(l, !1)), l;
  }
  return t.var(i, !0), r(() => t.break()), i;
  function r(l) {
    const c = t.const("len", (0, ie._)`${n}.length`);
    t.forRange("i", 0, c, (o) => {
      e.subschema({
        keyword: a,
        dataProp: o,
        dataPropType: ji.Type.Num
      }, i), t.if((0, ie.not)(i), l);
    });
  }
}
X.validateArray = zh;
function Uh(e) {
  const { gen: t, schema: n, keyword: a, it: s } = e;
  if (!Array.isArray(n))
    throw new Error("ajv implementation error");
  if (n.some((c) => (0, ji.alwaysValidSchema)(s, c)) && !s.opts.unevaluated)
    return;
  const r = t.let("valid", !1), l = t.name("_valid");
  t.block(() => n.forEach((c, o) => {
    const u = e.subschema({
      keyword: a,
      schemaProp: o,
      compositeRule: !0
    }, l);
    t.assign(r, (0, ie._)`${r} || ${l}`), e.mergeValidEvaluated(u, l) || t.if((0, ie.not)(r));
  })), e.result(r, () => e.reset(), () => e.error(!0));
}
X.validateUnion = Uh;
Object.defineProperty(We, "__esModule", { value: !0 });
We.validateKeywordUsage = We.validSchemaType = We.funcKeywordCode = We.macroKeywordCode = void 0;
const Se = B, bt = Ie, qh = X, Mh = On;
function Vh(e, t) {
  const { gen: n, keyword: a, schema: s, parentSchema: i, it: r } = e, l = t.macro.call(r.self, s, i, r), c = Pl(n, a, l);
  r.opts.validateSchema !== !1 && r.self.validateSchema(l, !0);
  const o = n.name("valid");
  e.subschema({
    schema: l,
    schemaPath: Se.nil,
    errSchemaPath: `${r.errSchemaPath}/${a}`,
    topSchemaRef: c,
    compositeRule: !0
  }, o), e.pass(o, () => e.error(!0));
}
We.macroKeywordCode = Vh;
function Bh(e, t) {
  var n;
  const { gen: a, keyword: s, schema: i, parentSchema: r, $data: l, it: c } = e;
  Gh(c, t);
  const o = !l && t.compile ? t.compile.call(c.self, i, r, c) : t.validate, u = Pl(a, s, o), p = a.let("valid");
  e.block$data(p, f), e.ok((n = t.valid) !== null && n !== void 0 ? n : p);
  function f() {
    if (t.errors === !1)
      y(), t.modifying && bo(e), g(() => e.error());
    else {
      const v = t.async ? h() : m();
      t.modifying && bo(e), g(() => Hh(e, v));
    }
  }
  function h() {
    const v = a.let("ruleErrs", null);
    return a.try(() => y((0, Se._)`await `), ($) => a.assign(p, !1).if((0, Se._)`${$} instanceof ${c.ValidationError}`, () => a.assign(v, (0, Se._)`${$}.errors`), () => a.throw($))), v;
  }
  function m() {
    const v = (0, Se._)`${u}.errors`;
    return a.assign(v, null), y(Se.nil), v;
  }
  function y(v = t.async ? (0, Se._)`await ` : Se.nil) {
    const $ = c.opts.passContext ? bt.default.this : bt.default.self, E = !("compile" in t && !l || t.schema === !1);
    a.assign(p, (0, Se._)`${v}${(0, qh.callValidateCode)(e, u, $, E)}`, t.modifying);
  }
  function g(v) {
    var $;
    a.if((0, Se.not)(($ = t.valid) !== null && $ !== void 0 ? $ : p), v);
  }
}
We.funcKeywordCode = Bh;
function bo(e) {
  const { gen: t, data: n, it: a } = e;
  t.if(a.parentData, () => t.assign(n, (0, Se._)`${a.parentData}[${a.parentDataProperty}]`));
}
function Hh(e, t) {
  const { gen: n } = e;
  n.if((0, Se._)`Array.isArray(${t})`, () => {
    n.assign(bt.default.vErrors, (0, Se._)`${bt.default.vErrors} === null ? ${t} : ${bt.default.vErrors}.concat(${t})`).assign(bt.default.errors, (0, Se._)`${bt.default.vErrors}.length`), (0, Mh.extendErrors)(e);
  }, () => e.error());
}
function Gh({ schemaEnv: e }, t) {
  if (t.async && !e.$async)
    throw new Error("async keyword in sync schema");
}
function Pl(e, t, n) {
  if (n === void 0)
    throw new Error(`keyword "${t}" failed to compile`);
  return e.scopeValue("keyword", typeof n == "function" ? { ref: n } : { ref: n, code: (0, Se.stringify)(n) });
}
function Kh(e, t, n = !1) {
  return !t.length || t.some((a) => a === "array" ? Array.isArray(e) : a === "object" ? e && typeof e == "object" && !Array.isArray(e) : typeof e == a || n && typeof e > "u");
}
We.validSchemaType = Kh;
function Wh({ schema: e, opts: t, self: n, errSchemaPath: a }, s, i) {
  if (Array.isArray(s.keyword) ? !s.keyword.includes(i) : s.keyword !== i)
    throw new Error("ajv implementation error");
  const r = s.dependencies;
  if (r != null && r.some((l) => !Object.prototype.hasOwnProperty.call(e, l)))
    throw new Error(`parent schema must have dependencies of ${i}: ${r.join(",")}`);
  if (s.validateSchema && !s.validateSchema(e[i])) {
    const c = `keyword "${i}" value is invalid at path "${a}": ` + n.errorsText(s.validateSchema.errors);
    if (t.validateSchema === "log")
      n.logger.error(c);
    else
      throw new Error(c);
  }
}
We.validateKeywordUsage = Wh;
var gt = {};
Object.defineProperty(gt, "__esModule", { value: !0 });
gt.extendSubschemaMode = gt.extendSubschemaData = gt.getSubschema = void 0;
const Ke = B, Nl = C;
function Xh(e, { keyword: t, schemaProp: n, schema: a, schemaPath: s, errSchemaPath: i, topSchemaRef: r }) {
  if (t !== void 0 && a !== void 0)
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  if (t !== void 0) {
    const l = e.schema[t];
    return n === void 0 ? {
      schema: l,
      schemaPath: (0, Ke._)`${e.schemaPath}${(0, Ke.getProperty)(t)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}`
    } : {
      schema: l[n],
      schemaPath: (0, Ke._)`${e.schemaPath}${(0, Ke.getProperty)(t)}${(0, Ke.getProperty)(n)}`,
      errSchemaPath: `${e.errSchemaPath}/${t}/${(0, Nl.escapeFragment)(n)}`
    };
  }
  if (a !== void 0) {
    if (s === void 0 || i === void 0 || r === void 0)
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    return {
      schema: a,
      schemaPath: s,
      topSchemaRef: r,
      errSchemaPath: i
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
gt.getSubschema = Xh;
function Jh(e, t, { dataProp: n, dataPropType: a, data: s, dataTypes: i, propertyName: r }) {
  if (s !== void 0 && n !== void 0)
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  const { gen: l } = t;
  if (n !== void 0) {
    const { errorPath: o, dataPathArr: u, opts: p } = t, f = l.let("data", (0, Ke._)`${t.data}${(0, Ke.getProperty)(n)}`, !0);
    c(f), e.errorPath = (0, Ke.str)`${o}${(0, Nl.getErrorPath)(n, a, p.jsPropertySyntax)}`, e.parentDataProperty = (0, Ke._)`${n}`, e.dataPathArr = [...u, e.parentDataProperty];
  }
  if (s !== void 0) {
    const o = s instanceof Ke.Name ? s : l.let("data", s, !0);
    c(o), r !== void 0 && (e.propertyName = r);
  }
  i && (e.dataTypes = i);
  function c(o) {
    e.data = o, e.dataLevel = t.dataLevel + 1, e.dataTypes = [], t.definedProperties = /* @__PURE__ */ new Set(), e.parentData = t.data, e.dataNames = [...t.dataNames, o];
  }
}
gt.extendSubschemaData = Jh;
function Yh(e, { jtdDiscriminator: t, jtdMetadata: n, compositeRule: a, createErrors: s, allErrors: i }) {
  a !== void 0 && (e.compositeRule = a), s !== void 0 && (e.createErrors = s), i !== void 0 && (e.allErrors = i), e.jtdDiscriminator = t, e.jtdMetadata = n;
}
gt.extendSubschemaMode = Yh;
var ye = {}, Al = function e(t, n) {
  if (t === n) return !0;
  if (t && n && typeof t == "object" && typeof n == "object") {
    if (t.constructor !== n.constructor) return !1;
    var a, s, i;
    if (Array.isArray(t)) {
      if (a = t.length, a != n.length) return !1;
      for (s = a; s-- !== 0; )
        if (!e(t[s], n[s])) return !1;
      return !0;
    }
    if (t.constructor === RegExp) return t.source === n.source && t.flags === n.flags;
    if (t.valueOf !== Object.prototype.valueOf) return t.valueOf() === n.valueOf();
    if (t.toString !== Object.prototype.toString) return t.toString() === n.toString();
    if (i = Object.keys(t), a = i.length, a !== Object.keys(n).length) return !1;
    for (s = a; s-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(n, i[s])) return !1;
    for (s = a; s-- !== 0; ) {
      var r = i[s];
      if (!e(t[r], n[r])) return !1;
    }
    return !0;
  }
  return t !== t && n !== n;
}, Il = { exports: {} }, ht = Il.exports = function(e, t, n) {
  typeof t == "function" && (n = t, t = {}), n = t.cb || n;
  var a = typeof n == "function" ? n : n.pre || function() {
  }, s = n.post || function() {
  };
  Xn(t, a, s, e, "", e);
};
ht.keywords = {
  additionalItems: !0,
  items: !0,
  contains: !0,
  additionalProperties: !0,
  propertyNames: !0,
  not: !0,
  if: !0,
  then: !0,
  else: !0
};
ht.arrayKeywords = {
  items: !0,
  allOf: !0,
  anyOf: !0,
  oneOf: !0
};
ht.propsKeywords = {
  $defs: !0,
  definitions: !0,
  properties: !0,
  patternProperties: !0,
  dependencies: !0
};
ht.skipKeywords = {
  default: !0,
  enum: !0,
  const: !0,
  required: !0,
  maximum: !0,
  minimum: !0,
  exclusiveMaximum: !0,
  exclusiveMinimum: !0,
  multipleOf: !0,
  maxLength: !0,
  minLength: !0,
  pattern: !0,
  format: !0,
  maxItems: !0,
  minItems: !0,
  uniqueItems: !0,
  maxProperties: !0,
  minProperties: !0
};
function Xn(e, t, n, a, s, i, r, l, c, o) {
  if (a && typeof a == "object" && !Array.isArray(a)) {
    t(a, s, i, r, l, c, o);
    for (var u in a) {
      var p = a[u];
      if (Array.isArray(p)) {
        if (u in ht.arrayKeywords)
          for (var f = 0; f < p.length; f++)
            Xn(e, t, n, p[f], s + "/" + u + "/" + f, i, s, u, a, f);
      } else if (u in ht.propsKeywords) {
        if (p && typeof p == "object")
          for (var h in p)
            Xn(e, t, n, p[h], s + "/" + u + "/" + Zh(h), i, s, u, a, h);
      } else (u in ht.keywords || e.allKeys && !(u in ht.skipKeywords)) && Xn(e, t, n, p, s + "/" + u, i, s, u, a);
    }
    n(a, s, i, r, l, c, o);
  }
}
function Zh(e) {
  return e.replace(/~/g, "~0").replace(/\//g, "~1");
}
var Qh = Il.exports;
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.getSchemaRefs = ye.resolveUrl = ye.normalizeId = ye._getFullPath = ye.getFullPath = ye.inlineRef = void 0;
const ev = C, tv = Al, nv = Qh, av = /* @__PURE__ */ new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function sv(e, t = !0) {
  return typeof e == "boolean" ? !0 : t === !0 ? !Ms(e) : t ? Cl(e) <= t : !1;
}
ye.inlineRef = sv;
const iv = /* @__PURE__ */ new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function Ms(e) {
  for (const t in e) {
    if (iv.has(t))
      return !0;
    const n = e[t];
    if (Array.isArray(n) && n.some(Ms) || typeof n == "object" && Ms(n))
      return !0;
  }
  return !1;
}
function Cl(e) {
  let t = 0;
  for (const n in e) {
    if (n === "$ref")
      return 1 / 0;
    if (t++, !av.has(n) && (typeof e[n] == "object" && (0, ev.eachItem)(e[n], (a) => t += Cl(a)), t === 1 / 0))
      return 1 / 0;
  }
  return t;
}
function Ll(e, t = "", n) {
  n !== !1 && (t = Bt(t));
  const a = e.parse(t);
  return Dl(e, a);
}
ye.getFullPath = Ll;
function Dl(e, t) {
  return e.serialize(t).split("#")[0] + "#";
}
ye._getFullPath = Dl;
const rv = /#\/?$/;
function Bt(e) {
  return e ? e.replace(rv, "") : "";
}
ye.normalizeId = Bt;
function ov(e, t, n) {
  return n = Bt(n), e.resolve(t, n);
}
ye.resolveUrl = ov;
const cv = /^[a-z_][-a-z0-9._]*$/i;
function lv(e, t) {
  if (typeof e == "boolean")
    return {};
  const { schemaId: n, uriResolver: a } = this.opts, s = Bt(e[n] || t), i = { "": s }, r = Ll(a, s, !1), l = {}, c = /* @__PURE__ */ new Set();
  return nv(e, { allKeys: !0 }, (p, f, h, m) => {
    if (m === void 0)
      return;
    const y = r + f;
    let g = i[m];
    typeof p[n] == "string" && (g = v.call(this, p[n])), $.call(this, p.$anchor), $.call(this, p.$dynamicAnchor), i[f] = g;
    function v(E) {
      const O = this.opts.uriResolver.resolve;
      if (E = Bt(g ? O(g, E) : E), c.has(E))
        throw u(E);
      c.add(E);
      let P = this.refs[E];
      return typeof P == "string" && (P = this.refs[P]), typeof P == "object" ? o(p, P.schema, E) : E !== Bt(y) && (E[0] === "#" ? (o(p, l[E], E), l[E] = p) : this.refs[E] = y), E;
    }
    function $(E) {
      if (typeof E == "string") {
        if (!cv.test(E))
          throw new Error(`invalid anchor "${E}"`);
        v.call(this, `#${E}`);
      }
    }
  }), l;
  function o(p, f, h) {
    if (f !== void 0 && !tv(p, f))
      throw u(h);
  }
  function u(p) {
    return new Error(`reference "${p}" resolves to more than one schema`);
  }
}
ye.getSchemaRefs = lv;
Object.defineProperty(De, "__esModule", { value: !0 });
De.getData = De.KeywordCxt = De.validateFunctionCode = void 0;
const Fl = Gt, $o = pe, Pi = et, ra = pe, uv = wa, fn = We, ms = gt, U = B, V = Ie, pv = ye, tt = C, ln = On;
function dv(e) {
  if (ql(e) && (Ml(e), Ul(e))) {
    hv(e);
    return;
  }
  zl(e, () => (0, Fl.topBoolOrEmptySchema)(e));
}
De.validateFunctionCode = dv;
function zl({ gen: e, validateName: t, schema: n, schemaEnv: a, opts: s }, i) {
  s.code.es5 ? e.func(t, (0, U._)`${V.default.data}, ${V.default.valCxt}`, a.$async, () => {
    e.code((0, U._)`"use strict"; ${wo(n, s)}`), fv(e, s), e.code(i);
  }) : e.func(t, (0, U._)`${V.default.data}, ${mv(s)}`, a.$async, () => e.code(wo(n, s)).code(i));
}
function mv(e) {
  return (0, U._)`{${V.default.instancePath}="", ${V.default.parentData}, ${V.default.parentDataProperty}, ${V.default.rootData}=${V.default.data}${e.dynamicRef ? (0, U._)`, ${V.default.dynamicAnchors}={}` : U.nil}}={}`;
}
function fv(e, t) {
  e.if(V.default.valCxt, () => {
    e.var(V.default.instancePath, (0, U._)`${V.default.valCxt}.${V.default.instancePath}`), e.var(V.default.parentData, (0, U._)`${V.default.valCxt}.${V.default.parentData}`), e.var(V.default.parentDataProperty, (0, U._)`${V.default.valCxt}.${V.default.parentDataProperty}`), e.var(V.default.rootData, (0, U._)`${V.default.valCxt}.${V.default.rootData}`), t.dynamicRef && e.var(V.default.dynamicAnchors, (0, U._)`${V.default.valCxt}.${V.default.dynamicAnchors}`);
  }, () => {
    e.var(V.default.instancePath, (0, U._)`""`), e.var(V.default.parentData, (0, U._)`undefined`), e.var(V.default.parentDataProperty, (0, U._)`undefined`), e.var(V.default.rootData, V.default.data), t.dynamicRef && e.var(V.default.dynamicAnchors, (0, U._)`{}`);
  });
}
function hv(e) {
  const { schema: t, opts: n, gen: a } = e;
  zl(e, () => {
    n.$comment && t.$comment && Bl(e), bv(e), a.let(V.default.vErrors, null), a.let(V.default.errors, 0), n.unevaluated && vv(e), Vl(e), _v(e);
  });
}
function vv(e) {
  const { gen: t, validateName: n } = e;
  e.evaluated = t.const("evaluated", (0, U._)`${n}.evaluated`), t.if((0, U._)`${e.evaluated}.dynamicProps`, () => t.assign((0, U._)`${e.evaluated}.props`, (0, U._)`undefined`)), t.if((0, U._)`${e.evaluated}.dynamicItems`, () => t.assign((0, U._)`${e.evaluated}.items`, (0, U._)`undefined`));
}
function wo(e, t) {
  const n = typeof e == "object" && e[t.schemaId];
  return n && (t.code.source || t.code.process) ? (0, U._)`/*# sourceURL=${n} */` : U.nil;
}
function gv(e, t) {
  if (ql(e) && (Ml(e), Ul(e))) {
    xv(e, t);
    return;
  }
  (0, Fl.boolOrEmptySchema)(e, t);
}
function Ul({ schema: e, self: t }) {
  if (typeof e == "boolean")
    return !e;
  for (const n in e)
    if (t.RULES.all[n])
      return !0;
  return !1;
}
function ql(e) {
  return typeof e.schema != "boolean";
}
function xv(e, t) {
  const { schema: n, gen: a, opts: s } = e;
  s.$comment && n.$comment && Bl(e), $v(e), wv(e);
  const i = a.const("_errs", V.default.errors);
  Vl(e, i), a.var(t, (0, U._)`${i} === ${V.default.errors}`);
}
function Ml(e) {
  (0, tt.checkUnknownRules)(e), yv(e);
}
function Vl(e, t) {
  if (e.opts.jtd)
    return _o(e, [], !1, t);
  const n = (0, $o.getSchemaTypes)(e.schema), a = (0, $o.coerceAndCheckDataType)(e, n);
  _o(e, n, !a, t);
}
function yv(e) {
  const { schema: t, errSchemaPath: n, opts: a, self: s } = e;
  t.$ref && a.ignoreKeywordsWithRef && (0, tt.schemaHasRulesButRef)(t, s.RULES) && s.logger.warn(`$ref: keywords ignored in schema at path "${n}"`);
}
function bv(e) {
  const { schema: t, opts: n } = e;
  t.default !== void 0 && n.useDefaults && n.strictSchema && (0, tt.checkStrictMode)(e, "default is ignored in the schema root");
}
function $v(e) {
  const t = e.schema[e.opts.schemaId];
  t && (e.baseId = (0, pv.resolveUrl)(e.opts.uriResolver, e.baseId, t));
}
function wv(e) {
  if (e.schema.$async && !e.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function Bl({ gen: e, schemaEnv: t, schema: n, errSchemaPath: a, opts: s }) {
  const i = n.$comment;
  if (s.$comment === !0)
    e.code((0, U._)`${V.default.self}.logger.log(${i})`);
  else if (typeof s.$comment == "function") {
    const r = (0, U.str)`${a}/$comment`, l = e.scopeValue("root", { ref: t.root });
    e.code((0, U._)`${V.default.self}.opts.$comment(${i}, ${r}, ${l}.schema)`);
  }
}
function _v(e) {
  const { gen: t, schemaEnv: n, validateName: a, ValidationError: s, opts: i } = e;
  n.$async ? t.if((0, U._)`${V.default.errors} === 0`, () => t.return(V.default.data), () => t.throw((0, U._)`new ${s}(${V.default.vErrors})`)) : (t.assign((0, U._)`${a}.errors`, V.default.vErrors), i.unevaluated && Ev(e), t.return((0, U._)`${V.default.errors} === 0`));
}
function Ev({ gen: e, evaluated: t, props: n, items: a }) {
  n instanceof U.Name && e.assign((0, U._)`${t}.props`, n), a instanceof U.Name && e.assign((0, U._)`${t}.items`, a);
}
function _o(e, t, n, a) {
  const { gen: s, schema: i, data: r, allErrors: l, opts: c, self: o } = e, { RULES: u } = o;
  if (i.$ref && (c.ignoreKeywordsWithRef || !(0, tt.schemaHasRulesButRef)(i, u))) {
    s.block(() => Kl(e, "$ref", u.all.$ref.definition));
    return;
  }
  c.jtd || Sv(e, t), s.block(() => {
    for (const f of u.rules)
      p(f);
    p(u.post);
  });
  function p(f) {
    (0, Pi.shouldUseGroup)(i, f) && (f.type ? (s.if((0, ra.checkDataType)(f.type, r, c.strictNumbers)), Eo(e, f), t.length === 1 && t[0] === f.type && n && (s.else(), (0, ra.reportTypeError)(e)), s.endIf()) : Eo(e, f), l || s.if((0, U._)`${V.default.errors} === ${a || 0}`));
  }
}
function Eo(e, t) {
  const { gen: n, schema: a, opts: { useDefaults: s } } = e;
  s && (0, uv.assignDefaults)(e, t.type), n.block(() => {
    for (const i of t.rules)
      (0, Pi.shouldUseRule)(a, i) && Kl(e, i.keyword, i.definition, t.type);
  });
}
function Sv(e, t) {
  e.schemaEnv.meta || !e.opts.strictTypes || (Rv(e, t), e.opts.allowUnionTypes || kv(e, t), jv(e, e.dataTypes));
}
function Rv(e, t) {
  if (t.length) {
    if (!e.dataTypes.length) {
      e.dataTypes = t;
      return;
    }
    t.forEach((n) => {
      Hl(e.dataTypes, n) || Ni(e, `type "${n}" not allowed by context "${e.dataTypes.join(",")}"`);
    }), Ov(e, t);
  }
}
function kv(e, t) {
  t.length > 1 && !(t.length === 2 && t.includes("null")) && Ni(e, "use allowUnionTypes to allow union type keyword");
}
function jv(e, t) {
  const n = e.self.RULES.all;
  for (const a in n) {
    const s = n[a];
    if (typeof s == "object" && (0, Pi.shouldUseRule)(e.schema, s)) {
      const { type: i } = s.definition;
      i.length && !i.some((r) => Tv(t, r)) && Ni(e, `missing type "${i.join(",")}" for keyword "${a}"`);
    }
  }
}
function Tv(e, t) {
  return e.includes(t) || t === "number" && e.includes("integer");
}
function Hl(e, t) {
  return e.includes(t) || t === "integer" && e.includes("number");
}
function Ov(e, t) {
  const n = [];
  for (const a of e.dataTypes)
    Hl(t, a) ? n.push(a) : t.includes("integer") && a === "number" && n.push("integer");
  e.dataTypes = n;
}
function Ni(e, t) {
  const n = e.schemaEnv.baseId + e.errSchemaPath;
  t += ` at "${n}" (strictTypes)`, (0, tt.checkStrictMode)(e, t, e.opts.strictTypes);
}
class Gl {
  constructor(t, n, a) {
    if ((0, fn.validateKeywordUsage)(t, n, a), this.gen = t.gen, this.allErrors = t.allErrors, this.keyword = a, this.data = t.data, this.schema = t.schema[a], this.$data = n.$data && t.opts.$data && this.schema && this.schema.$data, this.schemaValue = (0, tt.schemaRefOrVal)(t, this.schema, a, this.$data), this.schemaType = n.schemaType, this.parentSchema = t.schema, this.params = {}, this.it = t, this.def = n, this.$data)
      this.schemaCode = t.gen.const("vSchema", Wl(this.$data, t));
    else if (this.schemaCode = this.schemaValue, !(0, fn.validSchemaType)(this.schema, n.schemaType, n.allowUndefined))
      throw new Error(`${a} value must be ${JSON.stringify(n.schemaType)}`);
    ("code" in n ? n.trackErrors : n.errors !== !1) && (this.errsCount = t.gen.const("_errs", V.default.errors));
  }
  result(t, n, a) {
    this.failResult((0, U.not)(t), n, a);
  }
  failResult(t, n, a) {
    this.gen.if(t), a ? a() : this.error(), n ? (this.gen.else(), n(), this.allErrors && this.gen.endIf()) : this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  pass(t, n) {
    this.failResult((0, U.not)(t), void 0, n);
  }
  fail(t) {
    if (t === void 0) {
      this.error(), this.allErrors || this.gen.if(!1);
      return;
    }
    this.gen.if(t), this.error(), this.allErrors ? this.gen.endIf() : this.gen.else();
  }
  fail$data(t) {
    if (!this.$data)
      return this.fail(t);
    const { schemaCode: n } = this;
    this.fail((0, U._)`${n} !== undefined && (${(0, U.or)(this.invalid$data(), t)})`);
  }
  error(t, n, a) {
    if (n) {
      this.setParams(n), this._error(t, a), this.setParams({});
      return;
    }
    this._error(t, a);
  }
  _error(t, n) {
    (t ? ln.reportExtraError : ln.reportError)(this, this.def.error, n);
  }
  $dataError() {
    (0, ln.reportError)(this, this.def.$dataError || ln.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, ln.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(t) {
    this.allErrors || this.gen.if(t);
  }
  setParams(t, n) {
    n ? Object.assign(this.params, t) : this.params = t;
  }
  block$data(t, n, a = U.nil) {
    this.gen.block(() => {
      this.check$data(t, a), n();
    });
  }
  check$data(t = U.nil, n = U.nil) {
    if (!this.$data)
      return;
    const { gen: a, schemaCode: s, schemaType: i, def: r } = this;
    a.if((0, U.or)((0, U._)`${s} === undefined`, n)), t !== U.nil && a.assign(t, !0), (i.length || r.validateSchema) && (a.elseIf(this.invalid$data()), this.$dataError(), t !== U.nil && a.assign(t, !1)), a.else();
  }
  invalid$data() {
    const { gen: t, schemaCode: n, schemaType: a, def: s, it: i } = this;
    return (0, U.or)(r(), l());
    function r() {
      if (a.length) {
        if (!(n instanceof U.Name))
          throw new Error("ajv implementation error");
        const c = Array.isArray(a) ? a : [a];
        return (0, U._)`${(0, ra.checkDataTypes)(c, n, i.opts.strictNumbers, ra.DataType.Wrong)}`;
      }
      return U.nil;
    }
    function l() {
      if (s.validateSchema) {
        const c = t.scopeValue("validate$data", { ref: s.validateSchema });
        return (0, U._)`!${c}(${n})`;
      }
      return U.nil;
    }
  }
  subschema(t, n) {
    const a = (0, ms.getSubschema)(this.it, t);
    (0, ms.extendSubschemaData)(a, this.it, t), (0, ms.extendSubschemaMode)(a, t);
    const s = { ...this.it, ...a, items: void 0, props: void 0 };
    return gv(s, n), s;
  }
  mergeEvaluated(t, n) {
    const { it: a, gen: s } = this;
    a.opts.unevaluated && (a.props !== !0 && t.props !== void 0 && (a.props = tt.mergeEvaluated.props(s, t.props, a.props, n)), a.items !== !0 && t.items !== void 0 && (a.items = tt.mergeEvaluated.items(s, t.items, a.items, n)));
  }
  mergeValidEvaluated(t, n) {
    const { it: a, gen: s } = this;
    if (a.opts.unevaluated && (a.props !== !0 || a.items !== !0))
      return s.if(n, () => this.mergeEvaluated(t, U.Name)), !0;
  }
}
De.KeywordCxt = Gl;
function Kl(e, t, n, a) {
  const s = new Gl(e, n, t);
  "code" in n ? n.code(s, a) : s.$data && n.validate ? (0, fn.funcKeywordCode)(s, n) : "macro" in n ? (0, fn.macroKeywordCode)(s, n) : (n.compile || n.validate) && (0, fn.funcKeywordCode)(s, n);
}
const Pv = /^\/(?:[^~]|~0|~1)*$/, Nv = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function Wl(e, { dataLevel: t, dataNames: n, dataPathArr: a }) {
  let s, i;
  if (e === "")
    return V.default.rootData;
  if (e[0] === "/") {
    if (!Pv.test(e))
      throw new Error(`Invalid JSON-pointer: ${e}`);
    s = e, i = V.default.rootData;
  } else {
    const o = Nv.exec(e);
    if (!o)
      throw new Error(`Invalid JSON-pointer: ${e}`);
    const u = +o[1];
    if (s = o[2], s === "#") {
      if (u >= t)
        throw new Error(c("property/index", u));
      return a[t - u];
    }
    if (u > t)
      throw new Error(c("data", u));
    if (i = n[t - u], !s)
      return i;
  }
  let r = i;
  const l = s.split("/");
  for (const o of l)
    o && (i = (0, U._)`${i}${(0, U.getProperty)((0, tt.unescapeJsonPointer)(o))}`, r = (0, U._)`${r} && ${i}`);
  return r;
  function c(o, u) {
    return `Cannot access ${o} ${u} levels up, current level is ${t}`;
  }
}
De.getData = Wl;
var Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
class Av extends Error {
  constructor(t) {
    super("validation failed"), this.errors = t, this.ajv = this.validation = !0;
  }
}
Xt.default = Av;
var Nt = {};
Object.defineProperty(Nt, "__esModule", { value: !0 });
const fs = ye;
class Iv extends Error {
  constructor(t, n, a, s) {
    super(s || `can't resolve reference ${a} from id ${n}`), this.missingRef = (0, fs.resolveUrl)(t, n, a), this.missingSchema = (0, fs.normalizeId)((0, fs.getFullPath)(t, this.missingRef));
  }
}
Nt.default = Iv;
var Re = {};
Object.defineProperty(Re, "__esModule", { value: !0 });
Re.resolveSchema = Re.getCompilingSchema = Re.resolveRef = Re.compileSchema = Re.SchemaEnv = void 0;
const Fe = B, Cv = Xt, yt = Ie, Ue = ye, So = C, Lv = De;
class _a {
  constructor(t) {
    var n;
    this.refs = {}, this.dynamicAnchors = {};
    let a;
    typeof t.schema == "object" && (a = t.schema), this.schema = t.schema, this.schemaId = t.schemaId, this.root = t.root || this, this.baseId = (n = t.baseId) !== null && n !== void 0 ? n : (0, Ue.normalizeId)(a == null ? void 0 : a[t.schemaId || "$id"]), this.schemaPath = t.schemaPath, this.localRefs = t.localRefs, this.meta = t.meta, this.$async = a == null ? void 0 : a.$async, this.refs = {};
  }
}
Re.SchemaEnv = _a;
function Ai(e) {
  const t = Xl.call(this, e);
  if (t)
    return t;
  const n = (0, Ue.getFullPath)(this.opts.uriResolver, e.root.baseId), { es5: a, lines: s } = this.opts.code, { ownProperties: i } = this.opts, r = new Fe.CodeGen(this.scope, { es5: a, lines: s, ownProperties: i });
  let l;
  e.$async && (l = r.scopeValue("Error", {
    ref: Cv.default,
    code: (0, Fe._)`require("ajv/dist/runtime/validation_error").default`
  }));
  const c = r.scopeName("validate");
  e.validateName = c;
  const o = {
    gen: r,
    allErrors: this.opts.allErrors,
    data: yt.default.data,
    parentData: yt.default.parentData,
    parentDataProperty: yt.default.parentDataProperty,
    dataNames: [yt.default.data],
    dataPathArr: [Fe.nil],
    // TODO can its length be used as dataLevel if nil is removed?
    dataLevel: 0,
    dataTypes: [],
    definedProperties: /* @__PURE__ */ new Set(),
    topSchemaRef: r.scopeValue("schema", this.opts.code.source === !0 ? { ref: e.schema, code: (0, Fe.stringify)(e.schema) } : { ref: e.schema }),
    validateName: c,
    ValidationError: l,
    schema: e.schema,
    schemaEnv: e,
    rootId: n,
    baseId: e.baseId || n,
    schemaPath: Fe.nil,
    errSchemaPath: e.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, Fe._)`""`,
    opts: this.opts,
    self: this
  };
  let u;
  try {
    this._compilations.add(e), (0, Lv.validateFunctionCode)(o), r.optimize(this.opts.code.optimize);
    const p = r.toString();
    u = `${r.scopeRefs(yt.default.scope)}return ${p}`, this.opts.code.process && (u = this.opts.code.process(u, e));
    const h = new Function(`${yt.default.self}`, `${yt.default.scope}`, u)(this, this.scope.get());
    if (this.scope.value(c, { ref: h }), h.errors = null, h.schema = e.schema, h.schemaEnv = e, e.$async && (h.$async = !0), this.opts.code.source === !0 && (h.source = { validateName: c, validateCode: p, scopeValues: r._values }), this.opts.unevaluated) {
      const { props: m, items: y } = o;
      h.evaluated = {
        props: m instanceof Fe.Name ? void 0 : m,
        items: y instanceof Fe.Name ? void 0 : y,
        dynamicProps: m instanceof Fe.Name,
        dynamicItems: y instanceof Fe.Name
      }, h.source && (h.source.evaluated = (0, Fe.stringify)(h.evaluated));
    }
    return e.validate = h, e;
  } catch (p) {
    throw delete e.validate, delete e.validateName, u && this.logger.error("Error compiling schema, function code:", u), p;
  } finally {
    this._compilations.delete(e);
  }
}
Re.compileSchema = Ai;
function Dv(e, t, n) {
  var a;
  n = (0, Ue.resolveUrl)(this.opts.uriResolver, t, n);
  const s = e.refs[n];
  if (s)
    return s;
  let i = Uv.call(this, e, n);
  if (i === void 0) {
    const r = (a = e.localRefs) === null || a === void 0 ? void 0 : a[n], { schemaId: l } = this.opts;
    r && (i = new _a({ schema: r, schemaId: l, root: e, baseId: t }));
  }
  if (i !== void 0)
    return e.refs[n] = Fv.call(this, i);
}
Re.resolveRef = Dv;
function Fv(e) {
  return (0, Ue.inlineRef)(e.schema, this.opts.inlineRefs) ? e.schema : e.validate ? e : Ai.call(this, e);
}
function Xl(e) {
  for (const t of this._compilations)
    if (zv(t, e))
      return t;
}
Re.getCompilingSchema = Xl;
function zv(e, t) {
  return e.schema === t.schema && e.root === t.root && e.baseId === t.baseId;
}
function Uv(e, t) {
  let n;
  for (; typeof (n = this.refs[t]) == "string"; )
    t = n;
  return n || this.schemas[t] || Ea.call(this, e, t);
}
function Ea(e, t) {
  const n = this.opts.uriResolver.parse(t), a = (0, Ue._getFullPath)(this.opts.uriResolver, n);
  let s = (0, Ue.getFullPath)(this.opts.uriResolver, e.baseId, void 0);
  if (Object.keys(e.schema).length > 0 && a === s)
    return hs.call(this, n, e);
  const i = (0, Ue.normalizeId)(a), r = this.refs[i] || this.schemas[i];
  if (typeof r == "string") {
    const l = Ea.call(this, e, r);
    return typeof (l == null ? void 0 : l.schema) != "object" ? void 0 : hs.call(this, n, l);
  }
  if (typeof (r == null ? void 0 : r.schema) == "object") {
    if (r.validate || Ai.call(this, r), i === (0, Ue.normalizeId)(t)) {
      const { schema: l } = r, { schemaId: c } = this.opts, o = l[c];
      return o && (s = (0, Ue.resolveUrl)(this.opts.uriResolver, s, o)), new _a({ schema: l, schemaId: c, root: e, baseId: s });
    }
    return hs.call(this, n, r);
  }
}
Re.resolveSchema = Ea;
const qv = /* @__PURE__ */ new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function hs(e, { baseId: t, schema: n, root: a }) {
  var s;
  if (((s = e.fragment) === null || s === void 0 ? void 0 : s[0]) !== "/")
    return;
  for (const l of e.fragment.slice(1).split("/")) {
    if (typeof n == "boolean")
      return;
    const c = n[(0, So.unescapeFragment)(l)];
    if (c === void 0)
      return;
    n = c;
    const o = typeof n == "object" && n[this.opts.schemaId];
    !qv.has(l) && o && (t = (0, Ue.resolveUrl)(this.opts.uriResolver, t, o));
  }
  let i;
  if (typeof n != "boolean" && n.$ref && !(0, So.schemaHasRulesButRef)(n, this.RULES)) {
    const l = (0, Ue.resolveUrl)(this.opts.uriResolver, t, n.$ref);
    i = Ea.call(this, a, l);
  }
  const { schemaId: r } = this.opts;
  if (i = i || new _a({ schema: n, schemaId: r, root: a, baseId: t }), i.schema !== i.root.schema)
    return i;
}
const Mv = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#", Vv = "Meta-schema for $data reference (JSON AnySchema extension proposal)", Bv = "object", Hv = [
  "$data"
], Gv = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
}, Kv = !1, Wv = {
  $id: Mv,
  description: Vv,
  type: Bv,
  required: Hv,
  properties: Gv,
  additionalProperties: Kv
};
var Ii = {}, Sa = { exports: {} };
const Xv = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  a: 10,
  A: 10,
  b: 11,
  B: 11,
  c: 12,
  C: 12,
  d: 13,
  D: 13,
  e: 14,
  E: 14,
  f: 15,
  F: 15
};
var Jv = {
  HEX: Xv
};
const { HEX: Yv } = Jv;
function Jl(e) {
  if (Zl(e, ".") < 3)
    return { host: e, isIPV4: !1 };
  const t = e.match(/^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/u) || [], [n] = t;
  return n ? { host: Qv(n, "."), isIPV4: !0 } : { host: e, isIPV4: !1 };
}
function Vs(e, t = !1) {
  let n = "", a = !0;
  for (const s of e) {
    if (Yv[s] === void 0) return;
    s !== "0" && a === !0 && (a = !1), a || (n += s);
  }
  return t && n.length === 0 && (n = "0"), n;
}
function Zv(e) {
  let t = 0;
  const n = { error: !1, address: "", zone: "" }, a = [], s = [];
  let i = !1, r = !1, l = !1;
  function c() {
    if (s.length) {
      if (i === !1) {
        const o = Vs(s);
        if (o !== void 0)
          a.push(o);
        else
          return n.error = !0, !1;
      }
      s.length = 0;
    }
    return !0;
  }
  for (let o = 0; o < e.length; o++) {
    const u = e[o];
    if (!(u === "[" || u === "]"))
      if (u === ":") {
        if (r === !0 && (l = !0), !c())
          break;
        if (t++, a.push(":"), t > 7) {
          n.error = !0;
          break;
        }
        o - 1 >= 0 && e[o - 1] === ":" && (r = !0);
        continue;
      } else if (u === "%") {
        if (!c())
          break;
        i = !0;
      } else {
        s.push(u);
        continue;
      }
  }
  return s.length && (i ? n.zone = s.join("") : l ? a.push(s.join("")) : a.push(Vs(s))), n.address = a.join(""), n;
}
function Yl(e, t = {}) {
  if (Zl(e, ":") < 2)
    return { host: e, isIPV6: !1 };
  const n = Zv(e);
  if (n.error)
    return { host: e, isIPV6: !1 };
  {
    let a = n.address, s = n.address;
    return n.zone && (a += "%" + n.zone, s += "%25" + n.zone), { host: a, escapedHost: s, isIPV6: !0 };
  }
}
function Qv(e, t) {
  let n = "", a = !0;
  const s = e.length;
  for (let i = 0; i < s; i++) {
    const r = e[i];
    r === "0" && a ? (i + 1 <= s && e[i + 1] === t || i + 1 === s) && (n += r, a = !1) : (r === t ? a = !0 : a = !1, n += r);
  }
  return n;
}
function Zl(e, t) {
  let n = 0;
  for (let a = 0; a < e.length; a++)
    e[a] === t && n++;
  return n;
}
const Ro = /^\.\.?\//u, ko = /^\/\.(?:\/|$)/u, jo = /^\/\.\.(?:\/|$)/u, eg = /^\/?(?:.|\n)*?(?=\/|$)/u;
function tg(e) {
  const t = [];
  for (; e.length; )
    if (e.match(Ro))
      e = e.replace(Ro, "");
    else if (e.match(ko))
      e = e.replace(ko, "/");
    else if (e.match(jo))
      e = e.replace(jo, "/"), t.pop();
    else if (e === "." || e === "..")
      e = "";
    else {
      const n = e.match(eg);
      if (n) {
        const a = n[0];
        e = e.slice(a.length), t.push(a);
      } else
        throw new Error("Unexpected dot segment condition");
    }
  return t.join("");
}
function ng(e, t) {
  const n = t !== !0 ? escape : unescape;
  return e.scheme !== void 0 && (e.scheme = n(e.scheme)), e.userinfo !== void 0 && (e.userinfo = n(e.userinfo)), e.host !== void 0 && (e.host = n(e.host)), e.path !== void 0 && (e.path = n(e.path)), e.query !== void 0 && (e.query = n(e.query)), e.fragment !== void 0 && (e.fragment = n(e.fragment)), e;
}
function ag(e, t) {
  const n = [];
  if (e.userinfo !== void 0 && (n.push(e.userinfo), n.push("@")), e.host !== void 0) {
    let a = unescape(e.host);
    const s = Jl(a);
    if (s.isIPV4)
      a = s.host;
    else {
      const i = Yl(s.host, { isIPV4: !1 });
      i.isIPV6 === !0 ? a = `[${i.escapedHost}]` : a = e.host;
    }
    n.push(a);
  }
  return (typeof e.port == "number" || typeof e.port == "string") && (n.push(":"), n.push(String(e.port))), n.length ? n.join("") : void 0;
}
var sg = {
  recomposeAuthority: ag,
  normalizeComponentEncoding: ng,
  removeDotSegments: tg,
  normalizeIPv4: Jl,
  normalizeIPv6: Yl,
  stringArrayToHexStripped: Vs
};
const ig = /^[\da-f]{8}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{4}\b-[\da-f]{12}$/iu, rg = /([\da-z][\d\-a-z]{0,31}):((?:[\w!$'()*+,\-.:;=@]|%[\da-f]{2})+)/iu;
function Ql(e) {
  return typeof e.secure == "boolean" ? e.secure : String(e.scheme).toLowerCase() === "wss";
}
function eu(e) {
  return e.host || (e.error = e.error || "HTTP URIs must have a host."), e;
}
function tu(e) {
  const t = String(e.scheme).toLowerCase() === "https";
  return (e.port === (t ? 443 : 80) || e.port === "") && (e.port = void 0), e.path || (e.path = "/"), e;
}
function og(e) {
  return e.secure = Ql(e), e.resourceName = (e.path || "/") + (e.query ? "?" + e.query : ""), e.path = void 0, e.query = void 0, e;
}
function cg(e) {
  if ((e.port === (Ql(e) ? 443 : 80) || e.port === "") && (e.port = void 0), typeof e.secure == "boolean" && (e.scheme = e.secure ? "wss" : "ws", e.secure = void 0), e.resourceName) {
    const [t, n] = e.resourceName.split("?");
    e.path = t && t !== "/" ? t : void 0, e.query = n, e.resourceName = void 0;
  }
  return e.fragment = void 0, e;
}
function lg(e, t) {
  if (!e.path)
    return e.error = "URN can not be parsed", e;
  const n = e.path.match(rg);
  if (n) {
    const a = t.scheme || e.scheme || "urn";
    e.nid = n[1].toLowerCase(), e.nss = n[2];
    const s = `${a}:${t.nid || e.nid}`, i = Ci[s];
    e.path = void 0, i && (e = i.parse(e, t));
  } else
    e.error = e.error || "URN can not be parsed.";
  return e;
}
function ug(e, t) {
  const n = t.scheme || e.scheme || "urn", a = e.nid.toLowerCase(), s = `${n}:${t.nid || a}`, i = Ci[s];
  i && (e = i.serialize(e, t));
  const r = e, l = e.nss;
  return r.path = `${a || t.nid}:${l}`, t.skipEscape = !0, r;
}
function pg(e, t) {
  const n = e;
  return n.uuid = n.nss, n.nss = void 0, !t.tolerant && (!n.uuid || !ig.test(n.uuid)) && (n.error = n.error || "UUID is not valid."), n;
}
function dg(e) {
  const t = e;
  return t.nss = (e.uuid || "").toLowerCase(), t;
}
const nu = {
  scheme: "http",
  domainHost: !0,
  parse: eu,
  serialize: tu
}, mg = {
  scheme: "https",
  domainHost: nu.domainHost,
  parse: eu,
  serialize: tu
}, Jn = {
  scheme: "ws",
  domainHost: !0,
  parse: og,
  serialize: cg
}, fg = {
  scheme: "wss",
  domainHost: Jn.domainHost,
  parse: Jn.parse,
  serialize: Jn.serialize
}, hg = {
  scheme: "urn",
  parse: lg,
  serialize: ug,
  skipNormalize: !0
}, vg = {
  scheme: "urn:uuid",
  parse: pg,
  serialize: dg,
  skipNormalize: !0
}, Ci = {
  http: nu,
  https: mg,
  ws: Jn,
  wss: fg,
  urn: hg,
  "urn:uuid": vg
};
var gg = Ci;
const { normalizeIPv6: xg, normalizeIPv4: yg, removeDotSegments: dn, recomposeAuthority: bg, normalizeComponentEncoding: Ln } = sg, Li = gg;
function $g(e, t) {
  return typeof e == "string" ? e = Xe(nt(e, t), t) : typeof e == "object" && (e = nt(Xe(e, t), t)), e;
}
function wg(e, t, n) {
  const a = Object.assign({ scheme: "null" }, n), s = au(nt(e, a), nt(t, a), a, !0);
  return Xe(s, { ...a, skipEscape: !0 });
}
function au(e, t, n, a) {
  const s = {};
  return a || (e = nt(Xe(e, n), n), t = nt(Xe(t, n), n)), n = n || {}, !n.tolerant && t.scheme ? (s.scheme = t.scheme, s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = dn(t.path || ""), s.query = t.query) : (t.userinfo !== void 0 || t.host !== void 0 || t.port !== void 0 ? (s.userinfo = t.userinfo, s.host = t.host, s.port = t.port, s.path = dn(t.path || ""), s.query = t.query) : (t.path ? (t.path.charAt(0) === "/" ? s.path = dn(t.path) : ((e.userinfo !== void 0 || e.host !== void 0 || e.port !== void 0) && !e.path ? s.path = "/" + t.path : e.path ? s.path = e.path.slice(0, e.path.lastIndexOf("/") + 1) + t.path : s.path = t.path, s.path = dn(s.path)), s.query = t.query) : (s.path = e.path, t.query !== void 0 ? s.query = t.query : s.query = e.query), s.userinfo = e.userinfo, s.host = e.host, s.port = e.port), s.scheme = e.scheme), s.fragment = t.fragment, s;
}
function _g(e, t, n) {
  return typeof e == "string" ? (e = unescape(e), e = Xe(Ln(nt(e, n), !0), { ...n, skipEscape: !0 })) : typeof e == "object" && (e = Xe(Ln(e, !0), { ...n, skipEscape: !0 })), typeof t == "string" ? (t = unescape(t), t = Xe(Ln(nt(t, n), !0), { ...n, skipEscape: !0 })) : typeof t == "object" && (t = Xe(Ln(t, !0), { ...n, skipEscape: !0 })), e.toLowerCase() === t.toLowerCase();
}
function Xe(e, t) {
  const n = {
    host: e.host,
    scheme: e.scheme,
    userinfo: e.userinfo,
    port: e.port,
    path: e.path,
    query: e.query,
    nid: e.nid,
    nss: e.nss,
    uuid: e.uuid,
    fragment: e.fragment,
    reference: e.reference,
    resourceName: e.resourceName,
    secure: e.secure,
    error: ""
  }, a = Object.assign({}, t), s = [], i = Li[(a.scheme || n.scheme || "").toLowerCase()];
  i && i.serialize && i.serialize(n, a), n.path !== void 0 && (a.skipEscape ? n.path = unescape(n.path) : (n.path = escape(n.path), n.scheme !== void 0 && (n.path = n.path.split("%3A").join(":")))), a.reference !== "suffix" && n.scheme && s.push(n.scheme, ":");
  const r = bg(n, a);
  if (r !== void 0 && (a.reference !== "suffix" && s.push("//"), s.push(r), n.path && n.path.charAt(0) !== "/" && s.push("/")), n.path !== void 0) {
    let l = n.path;
    !a.absolutePath && (!i || !i.absolutePath) && (l = dn(l)), r === void 0 && (l = l.replace(/^\/\//u, "/%2F")), s.push(l);
  }
  return n.query !== void 0 && s.push("?", n.query), n.fragment !== void 0 && s.push("#", n.fragment), s.join("");
}
const Eg = Array.from({ length: 127 }, (e, t) => /[^!"$&'()*+,\-.;=_`a-z{}~]/u.test(String.fromCharCode(t)));
function Sg(e) {
  let t = 0;
  for (let n = 0, a = e.length; n < a; ++n)
    if (t = e.charCodeAt(n), t > 126 || Eg[t])
      return !0;
  return !1;
}
const Rg = /^(?:([^#/:?]+):)?(?:\/\/((?:([^#/?@]*)@)?(\[[^#/?\]]+\]|[^#/:?]*)(?::(\d*))?))?([^#?]*)(?:\?([^#]*))?(?:#((?:.|[\n\r])*))?/u;
function nt(e, t) {
  const n = Object.assign({}, t), a = {
    scheme: void 0,
    userinfo: void 0,
    host: "",
    port: void 0,
    path: "",
    query: void 0,
    fragment: void 0
  }, s = e.indexOf("%") !== -1;
  let i = !1;
  n.reference === "suffix" && (e = (n.scheme ? n.scheme + ":" : "") + "//" + e);
  const r = e.match(Rg);
  if (r) {
    if (a.scheme = r[1], a.userinfo = r[3], a.host = r[4], a.port = parseInt(r[5], 10), a.path = r[6] || "", a.query = r[7], a.fragment = r[8], isNaN(a.port) && (a.port = r[5]), a.host) {
      const c = yg(a.host);
      if (c.isIPV4 === !1) {
        const o = xg(c.host, { isIPV4: !1 });
        a.host = o.host.toLowerCase(), i = o.isIPV6;
      } else
        a.host = c.host, i = !0;
    }
    a.scheme === void 0 && a.userinfo === void 0 && a.host === void 0 && a.port === void 0 && !a.path && a.query === void 0 ? a.reference = "same-document" : a.scheme === void 0 ? a.reference = "relative" : a.fragment === void 0 ? a.reference = "absolute" : a.reference = "uri", n.reference && n.reference !== "suffix" && n.reference !== a.reference && (a.error = a.error || "URI is not a " + n.reference + " reference.");
    const l = Li[(n.scheme || a.scheme || "").toLowerCase()];
    if (!n.unicodeSupport && (!l || !l.unicodeSupport) && a.host && (n.domainHost || l && l.domainHost) && i === !1 && Sg(a.host))
      try {
        a.host = URL.domainToASCII(a.host.toLowerCase());
      } catch (c) {
        a.error = a.error || "Host's domain name can not be converted to ASCII: " + c;
      }
    (!l || l && !l.skipNormalize) && (s && a.scheme !== void 0 && (a.scheme = unescape(a.scheme)), s && a.host !== void 0 && (a.host = unescape(a.host)), a.path !== void 0 && a.path.length && (a.path = escape(unescape(a.path))), a.fragment !== void 0 && a.fragment.length && (a.fragment = encodeURI(decodeURIComponent(a.fragment)))), l && l.parse && l.parse(a, n);
  } else
    a.error = a.error || "URI can not be parsed.";
  return a;
}
const Di = {
  SCHEMES: Li,
  normalize: $g,
  resolve: wg,
  resolveComponents: au,
  equal: _g,
  serialize: Xe,
  parse: nt
};
Sa.exports = Di;
Sa.exports.default = Di;
Sa.exports.fastUri = Di;
var kg = Sa.exports;
Object.defineProperty(Ii, "__esModule", { value: !0 });
const su = kg;
su.code = 'require("ajv/dist/runtime/uri").default';
Ii.default = su;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CodeGen = e.Name = e.nil = e.stringify = e.str = e._ = e.KeywordCxt = void 0;
  var t = De;
  Object.defineProperty(e, "KeywordCxt", { enumerable: !0, get: function() {
    return t.KeywordCxt;
  } });
  var n = B;
  Object.defineProperty(e, "_", { enumerable: !0, get: function() {
    return n._;
  } }), Object.defineProperty(e, "str", { enumerable: !0, get: function() {
    return n.str;
  } }), Object.defineProperty(e, "stringify", { enumerable: !0, get: function() {
    return n.stringify;
  } }), Object.defineProperty(e, "nil", { enumerable: !0, get: function() {
    return n.nil;
  } }), Object.defineProperty(e, "Name", { enumerable: !0, get: function() {
    return n.Name;
  } }), Object.defineProperty(e, "CodeGen", { enumerable: !0, get: function() {
    return n.CodeGen;
  } });
  const a = Xt, s = Nt, i = Ot, r = Re, l = B, c = ye, o = pe, u = C, p = Wv, f = Ii, h = (R, b) => new RegExp(R, b);
  h.code = "new RegExp";
  const m = ["removeAdditional", "useDefaults", "coerceTypes"], y = /* @__PURE__ */ new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]), g = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  }, v = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  }, $ = 200;
  function E(R) {
    var b, S, w, d, x, k, z, L, ne, Q, ve, At, za, Ua, qa, Ma, Va, Ba, Ha, Ga, Ka, Wa, Xa, Ja, Ya;
    const tn = R.strict, Za = (b = R.code) === null || b === void 0 ? void 0 : b.optimize, Pr = Za === !0 || Za === void 0 ? 1 : Za || 0, Nr = (w = (S = R.code) === null || S === void 0 ? void 0 : S.regExp) !== null && w !== void 0 ? w : h, Au = (d = R.uriResolver) !== null && d !== void 0 ? d : f.default;
    return {
      strictSchema: (k = (x = R.strictSchema) !== null && x !== void 0 ? x : tn) !== null && k !== void 0 ? k : !0,
      strictNumbers: (L = (z = R.strictNumbers) !== null && z !== void 0 ? z : tn) !== null && L !== void 0 ? L : !0,
      strictTypes: (Q = (ne = R.strictTypes) !== null && ne !== void 0 ? ne : tn) !== null && Q !== void 0 ? Q : "log",
      strictTuples: (At = (ve = R.strictTuples) !== null && ve !== void 0 ? ve : tn) !== null && At !== void 0 ? At : "log",
      strictRequired: (Ua = (za = R.strictRequired) !== null && za !== void 0 ? za : tn) !== null && Ua !== void 0 ? Ua : !1,
      code: R.code ? { ...R.code, optimize: Pr, regExp: Nr } : { optimize: Pr, regExp: Nr },
      loopRequired: (qa = R.loopRequired) !== null && qa !== void 0 ? qa : $,
      loopEnum: (Ma = R.loopEnum) !== null && Ma !== void 0 ? Ma : $,
      meta: (Va = R.meta) !== null && Va !== void 0 ? Va : !0,
      messages: (Ba = R.messages) !== null && Ba !== void 0 ? Ba : !0,
      inlineRefs: (Ha = R.inlineRefs) !== null && Ha !== void 0 ? Ha : !0,
      schemaId: (Ga = R.schemaId) !== null && Ga !== void 0 ? Ga : "$id",
      addUsedSchema: (Ka = R.addUsedSchema) !== null && Ka !== void 0 ? Ka : !0,
      validateSchema: (Wa = R.validateSchema) !== null && Wa !== void 0 ? Wa : !0,
      validateFormats: (Xa = R.validateFormats) !== null && Xa !== void 0 ? Xa : !0,
      unicodeRegExp: (Ja = R.unicodeRegExp) !== null && Ja !== void 0 ? Ja : !0,
      int32range: (Ya = R.int32range) !== null && Ya !== void 0 ? Ya : !0,
      uriResolver: Au
    };
  }
  class O {
    constructor(b = {}) {
      this.schemas = {}, this.refs = {}, this.formats = {}, this._compilations = /* @__PURE__ */ new Set(), this._loading = {}, this._cache = /* @__PURE__ */ new Map(), b = this.opts = { ...b, ...E(b) };
      const { es5: S, lines: w } = this.opts.code;
      this.scope = new l.ValueScope({ scope: {}, prefixes: y, es5: S, lines: w }), this.logger = M(b.logger);
      const d = b.validateFormats;
      b.validateFormats = !1, this.RULES = (0, i.getRules)(), P.call(this, g, b, "NOT SUPPORTED"), P.call(this, v, b, "DEPRECATED", "warn"), this._metaOpts = he.call(this), b.formats && se.call(this), this._addVocabularies(), this._addDefaultMetaSchema(), b.keywords && ce.call(this, b.keywords), typeof b.meta == "object" && this.addMetaSchema(b.meta), W.call(this), b.validateFormats = d;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data: b, meta: S, schemaId: w } = this.opts;
      let d = p;
      w === "id" && (d = { ...p }, d.id = d.$id, delete d.$id), S && b && this.addMetaSchema(d, d[w], !1);
    }
    defaultMeta() {
      const { meta: b, schemaId: S } = this.opts;
      return this.opts.defaultMeta = typeof b == "object" ? b[S] || b : void 0;
    }
    validate(b, S) {
      let w;
      if (typeof b == "string") {
        if (w = this.getSchema(b), !w)
          throw new Error(`no schema with key or ref "${b}"`);
      } else
        w = this.compile(b);
      const d = w(S);
      return "$async" in w || (this.errors = w.errors), d;
    }
    compile(b, S) {
      const w = this._addSchema(b, S);
      return w.validate || this._compileSchemaEnv(w);
    }
    compileAsync(b, S) {
      if (typeof this.opts.loadSchema != "function")
        throw new Error("options.loadSchema should be a function");
      const { loadSchema: w } = this.opts;
      return d.call(this, b, S);
      async function d(Q, ve) {
        await x.call(this, Q.$schema);
        const At = this._addSchema(Q, ve);
        return At.validate || k.call(this, At);
      }
      async function x(Q) {
        Q && !this.getSchema(Q) && await d.call(this, { $ref: Q }, !0);
      }
      async function k(Q) {
        try {
          return this._compileSchemaEnv(Q);
        } catch (ve) {
          if (!(ve instanceof s.default))
            throw ve;
          return z.call(this, ve), await L.call(this, ve.missingSchema), k.call(this, Q);
        }
      }
      function z({ missingSchema: Q, missingRef: ve }) {
        if (this.refs[Q])
          throw new Error(`AnySchema ${Q} is loaded but ${ve} cannot be resolved`);
      }
      async function L(Q) {
        const ve = await ne.call(this, Q);
        this.refs[Q] || await x.call(this, ve.$schema), this.refs[Q] || this.addSchema(ve, Q, S);
      }
      async function ne(Q) {
        const ve = this._loading[Q];
        if (ve)
          return ve;
        try {
          return await (this._loading[Q] = w(Q));
        } finally {
          delete this._loading[Q];
        }
      }
    }
    // Adds schema to the instance
    addSchema(b, S, w, d = this.opts.validateSchema) {
      if (Array.isArray(b)) {
        for (const k of b)
          this.addSchema(k, void 0, w, d);
        return this;
      }
      let x;
      if (typeof b == "object") {
        const { schemaId: k } = this.opts;
        if (x = b[k], x !== void 0 && typeof x != "string")
          throw new Error(`schema ${k} must be string`);
      }
      return S = (0, c.normalizeId)(S || x), this._checkUnique(S), this.schemas[S] = this._addSchema(b, w, S, d, !0), this;
    }
    // Add schema that will be used to validate other schemas
    // options in META_IGNORE_OPTIONS are alway set to false
    addMetaSchema(b, S, w = this.opts.validateSchema) {
      return this.addSchema(b, S, !0, w), this;
    }
    //  Validate schema against its meta-schema
    validateSchema(b, S) {
      if (typeof b == "boolean")
        return !0;
      let w;
      if (w = b.$schema, w !== void 0 && typeof w != "string")
        throw new Error("$schema must be a string");
      if (w = w || this.opts.defaultMeta || this.defaultMeta(), !w)
        return this.logger.warn("meta-schema not available"), this.errors = null, !0;
      const d = this.validate(w, b);
      if (!d && S) {
        const x = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(x);
        else
          throw new Error(x);
      }
      return d;
    }
    // Get compiled schema by `key` or `ref`.
    // (`key` that was passed to `addSchema` or full schema reference - `schema.$id` or resolved id)
    getSchema(b) {
      let S;
      for (; typeof (S = H.call(this, b)) == "string"; )
        b = S;
      if (S === void 0) {
        const { schemaId: w } = this.opts, d = new r.SchemaEnv({ schema: {}, schemaId: w });
        if (S = r.resolveSchema.call(this, d, b), !S)
          return;
        this.refs[b] = S;
      }
      return S.validate || this._compileSchemaEnv(S);
    }
    // Remove cached schema(s).
    // If no parameter is passed all schemas but meta-schemas are removed.
    // If RegExp is passed all schemas with key/id matching pattern but meta-schemas are removed.
    // Even if schema is referenced by other schemas it still can be removed as other schemas have local references.
    removeSchema(b) {
      if (b instanceof RegExp)
        return this._removeAllSchemas(this.schemas, b), this._removeAllSchemas(this.refs, b), this;
      switch (typeof b) {
        case "undefined":
          return this._removeAllSchemas(this.schemas), this._removeAllSchemas(this.refs), this._cache.clear(), this;
        case "string": {
          const S = H.call(this, b);
          return typeof S == "object" && this._cache.delete(S.schema), delete this.schemas[b], delete this.refs[b], this;
        }
        case "object": {
          const S = b;
          this._cache.delete(S);
          let w = b[this.opts.schemaId];
          return w && (w = (0, c.normalizeId)(w), delete this.schemas[w], delete this.refs[w]), this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    // add "vocabulary" - a collection of keywords
    addVocabulary(b) {
      for (const S of b)
        this.addKeyword(S);
      return this;
    }
    addKeyword(b, S) {
      let w;
      if (typeof b == "string")
        w = b, typeof S == "object" && (this.logger.warn("these parameters are deprecated, see docs for addKeyword"), S.keyword = w);
      else if (typeof b == "object" && S === void 0) {
        if (S = b, w = S.keyword, Array.isArray(w) && !w.length)
          throw new Error("addKeywords: keyword must be string or non-empty array");
      } else
        throw new Error("invalid addKeywords parameters");
      if (j.call(this, w, S), !S)
        return (0, u.eachItem)(w, (x) => N.call(this, x)), this;
      T.call(this, S);
      const d = {
        ...S,
        type: (0, o.getJSONTypes)(S.type),
        schemaType: (0, o.getJSONTypes)(S.schemaType)
      };
      return (0, u.eachItem)(w, d.type.length === 0 ? (x) => N.call(this, x, d) : (x) => d.type.forEach((k) => N.call(this, x, d, k))), this;
    }
    getKeyword(b) {
      const S = this.RULES.all[b];
      return typeof S == "object" ? S.definition : !!S;
    }
    // Remove keyword
    removeKeyword(b) {
      const { RULES: S } = this;
      delete S.keywords[b], delete S.all[b];
      for (const w of S.rules) {
        const d = w.rules.findIndex((x) => x.keyword === b);
        d >= 0 && w.rules.splice(d, 1);
      }
      return this;
    }
    // Add format
    addFormat(b, S) {
      return typeof S == "string" && (S = new RegExp(S)), this.formats[b] = S, this;
    }
    errorsText(b = this.errors, { separator: S = ", ", dataVar: w = "data" } = {}) {
      return !b || b.length === 0 ? "No errors" : b.map((d) => `${w}${d.instancePath} ${d.message}`).reduce((d, x) => d + S + x);
    }
    $dataMetaSchema(b, S) {
      const w = this.RULES.all;
      b = JSON.parse(JSON.stringify(b));
      for (const d of S) {
        const x = d.split("/").slice(1);
        let k = b;
        for (const z of x)
          k = k[z];
        for (const z in w) {
          const L = w[z];
          if (typeof L != "object")
            continue;
          const { $data: ne } = L.definition, Q = k[z];
          ne && Q && (k[z] = I(Q));
        }
      }
      return b;
    }
    _removeAllSchemas(b, S) {
      for (const w in b) {
        const d = b[w];
        (!S || S.test(w)) && (typeof d == "string" ? delete b[w] : d && !d.meta && (this._cache.delete(d.schema), delete b[w]));
      }
    }
    _addSchema(b, S, w, d = this.opts.validateSchema, x = this.opts.addUsedSchema) {
      let k;
      const { schemaId: z } = this.opts;
      if (typeof b == "object")
        k = b[z];
      else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        if (typeof b != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let L = this._cache.get(b);
      if (L !== void 0)
        return L;
      w = (0, c.normalizeId)(k || w);
      const ne = c.getSchemaRefs.call(this, b, w);
      return L = new r.SchemaEnv({ schema: b, schemaId: z, meta: S, baseId: w, localRefs: ne }), this._cache.set(L.schema, L), x && !w.startsWith("#") && (w && this._checkUnique(w), this.refs[w] = L), d && this.validateSchema(b, !0), L;
    }
    _checkUnique(b) {
      if (this.schemas[b] || this.refs[b])
        throw new Error(`schema with key or id "${b}" already exists`);
    }
    _compileSchemaEnv(b) {
      if (b.meta ? this._compileMetaSchema(b) : r.compileSchema.call(this, b), !b.validate)
        throw new Error("ajv implementation error");
      return b.validate;
    }
    _compileMetaSchema(b) {
      const S = this.opts;
      this.opts = this._metaOpts;
      try {
        r.compileSchema.call(this, b);
      } finally {
        this.opts = S;
      }
    }
  }
  O.ValidationError = a.default, O.MissingRefError = s.default, e.default = O;
  function P(R, b, S, w = "error") {
    for (const d in R) {
      const x = d;
      x in b && this.logger[w](`${S}: option ${d}. ${R[x]}`);
    }
  }
  function H(R) {
    return R = (0, c.normalizeId)(R), this.schemas[R] || this.refs[R];
  }
  function W() {
    const R = this.opts.schemas;
    if (R)
      if (Array.isArray(R))
        this.addSchema(R);
      else
        for (const b in R)
          this.addSchema(R[b], b);
  }
  function se() {
    for (const R in this.opts.formats) {
      const b = this.opts.formats[R];
      b && this.addFormat(R, b);
    }
  }
  function ce(R) {
    if (Array.isArray(R)) {
      this.addVocabulary(R);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const b in R) {
      const S = R[b];
      S.keyword || (S.keyword = b), this.addKeyword(S);
    }
  }
  function he() {
    const R = { ...this.opts };
    for (const b of m)
      delete R[b];
    return R;
  }
  const q = { log() {
  }, warn() {
  }, error() {
  } };
  function M(R) {
    if (R === !1)
      return q;
    if (R === void 0)
      return console;
    if (R.log && R.warn && R.error)
      return R;
    throw new Error("logger must implement log, warn and error methods");
  }
  const te = /^[a-z_$][a-z0-9_$:-]*$/i;
  function j(R, b) {
    const { RULES: S } = this;
    if ((0, u.eachItem)(R, (w) => {
      if (S.keywords[w])
        throw new Error(`Keyword ${w} is already defined`);
      if (!te.test(w))
        throw new Error(`Keyword ${w} has invalid name`);
    }), !!b && b.$data && !("code" in b || "validate" in b))
      throw new Error('$data keyword must have "code" or "validate" function');
  }
  function N(R, b, S) {
    var w;
    const d = b == null ? void 0 : b.post;
    if (S && d)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES: x } = this;
    let k = d ? x.post : x.rules.find(({ type: L }) => L === S);
    if (k || (k = { type: S, rules: [] }, x.rules.push(k)), x.keywords[R] = !0, !b)
      return;
    const z = {
      keyword: R,
      definition: {
        ...b,
        type: (0, o.getJSONTypes)(b.type),
        schemaType: (0, o.getJSONTypes)(b.schemaType)
      }
    };
    b.before ? F.call(this, k, z, b.before) : k.rules.push(z), x.all[R] = z, (w = b.implements) === null || w === void 0 || w.forEach((L) => this.addKeyword(L));
  }
  function F(R, b, S) {
    const w = R.rules.findIndex((d) => d.keyword === S);
    w >= 0 ? R.rules.splice(w, 0, b) : (R.rules.push(b), this.logger.warn(`rule ${S} is not defined`));
  }
  function T(R) {
    let { metaSchema: b } = R;
    b !== void 0 && (R.$data && this.opts.$data && (b = I(b)), R.validateSchema = this.compile(b, !0));
  }
  const A = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function I(R) {
    return { anyOf: [R, A] };
  }
})(_i);
var Fi = {}, Ra = {}, zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
const jg = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
zi.default = jg;
var at = {};
Object.defineProperty(at, "__esModule", { value: !0 });
at.callRef = at.getValidate = void 0;
const Tg = Nt, To = X, je = B, Ct = Ie, Oo = Re, Dn = C, Og = {
  keyword: "$ref",
  schemaType: "string",
  code(e) {
    const { gen: t, schema: n, it: a } = e, { baseId: s, schemaEnv: i, validateName: r, opts: l, self: c } = a, { root: o } = i;
    if ((n === "#" || n === "#/") && s === o.baseId)
      return p();
    const u = Oo.resolveRef.call(c, o, s, n);
    if (u === void 0)
      throw new Tg.default(a.opts.uriResolver, s, n);
    if (u instanceof Oo.SchemaEnv)
      return f(u);
    return h(u);
    function p() {
      if (i === o)
        return Yn(e, r, i, i.$async);
      const m = t.scopeValue("root", { ref: o });
      return Yn(e, (0, je._)`${m}.validate`, o, o.$async);
    }
    function f(m) {
      const y = iu(e, m);
      Yn(e, y, m, m.$async);
    }
    function h(m) {
      const y = t.scopeValue("schema", l.code.source === !0 ? { ref: m, code: (0, je.stringify)(m) } : { ref: m }), g = t.name("valid"), v = e.subschema({
        schema: m,
        dataTypes: [],
        schemaPath: je.nil,
        topSchemaRef: y,
        errSchemaPath: n
      }, g);
      e.mergeEvaluated(v), e.ok(g);
    }
  }
};
function iu(e, t) {
  const { gen: n } = e;
  return t.validate ? n.scopeValue("validate", { ref: t.validate }) : (0, je._)`${n.scopeValue("wrapper", { ref: t })}.validate`;
}
at.getValidate = iu;
function Yn(e, t, n, a) {
  const { gen: s, it: i } = e, { allErrors: r, schemaEnv: l, opts: c } = i, o = c.passContext ? Ct.default.this : je.nil;
  a ? u() : p();
  function u() {
    if (!l.$async)
      throw new Error("async schema referenced by sync schema");
    const m = s.let("valid");
    s.try(() => {
      s.code((0, je._)`await ${(0, To.callValidateCode)(e, t, o)}`), h(t), r || s.assign(m, !0);
    }, (y) => {
      s.if((0, je._)`!(${y} instanceof ${i.ValidationError})`, () => s.throw(y)), f(y), r || s.assign(m, !1);
    }), e.ok(m);
  }
  function p() {
    e.result((0, To.callValidateCode)(e, t, o), () => h(t), () => f(t));
  }
  function f(m) {
    const y = (0, je._)`${m}.errors`;
    s.assign(Ct.default.vErrors, (0, je._)`${Ct.default.vErrors} === null ? ${y} : ${Ct.default.vErrors}.concat(${y})`), s.assign(Ct.default.errors, (0, je._)`${Ct.default.vErrors}.length`);
  }
  function h(m) {
    var y;
    if (!i.opts.unevaluated)
      return;
    const g = (y = n == null ? void 0 : n.validate) === null || y === void 0 ? void 0 : y.evaluated;
    if (i.props !== !0)
      if (g && !g.dynamicProps)
        g.props !== void 0 && (i.props = Dn.mergeEvaluated.props(s, g.props, i.props));
      else {
        const v = s.var("props", (0, je._)`${m}.evaluated.props`);
        i.props = Dn.mergeEvaluated.props(s, v, i.props, je.Name);
      }
    if (i.items !== !0)
      if (g && !g.dynamicItems)
        g.items !== void 0 && (i.items = Dn.mergeEvaluated.items(s, g.items, i.items));
      else {
        const v = s.var("items", (0, je._)`${m}.evaluated.items`);
        i.items = Dn.mergeEvaluated.items(s, v, i.items, je.Name);
      }
  }
}
at.callRef = Yn;
at.default = Og;
Object.defineProperty(Ra, "__esModule", { value: !0 });
const Pg = zi, Ng = at, Ag = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  Pg.default,
  Ng.default
];
Ra.default = Ag;
var ka = {}, Ui = {};
Object.defineProperty(Ui, "__esModule", { value: !0 });
const oa = B, ut = oa.operators, ca = {
  maximum: { okStr: "<=", ok: ut.LTE, fail: ut.GT },
  minimum: { okStr: ">=", ok: ut.GTE, fail: ut.LT },
  exclusiveMaximum: { okStr: "<", ok: ut.LT, fail: ut.GTE },
  exclusiveMinimum: { okStr: ">", ok: ut.GT, fail: ut.LTE }
}, Ig = {
  message: ({ keyword: e, schemaCode: t }) => (0, oa.str)`must be ${ca[e].okStr} ${t}`,
  params: ({ keyword: e, schemaCode: t }) => (0, oa._)`{comparison: ${ca[e].okStr}, limit: ${t}}`
}, Cg = {
  keyword: Object.keys(ca),
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Ig,
  code(e) {
    const { keyword: t, data: n, schemaCode: a } = e;
    e.fail$data((0, oa._)`${n} ${ca[t].fail} ${a} || isNaN(${n})`);
  }
};
Ui.default = Cg;
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
const hn = B, Lg = {
  message: ({ schemaCode: e }) => (0, hn.str)`must be multiple of ${e}`,
  params: ({ schemaCode: e }) => (0, hn._)`{multipleOf: ${e}}`
}, Dg = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: !0,
  error: Lg,
  code(e) {
    const { gen: t, data: n, schemaCode: a, it: s } = e, i = s.opts.multipleOfPrecision, r = t.let("res"), l = i ? (0, hn._)`Math.abs(Math.round(${r}) - ${r}) > 1e-${i}` : (0, hn._)`${r} !== parseInt(${r})`;
    e.fail$data((0, hn._)`(${a} === 0 || (${r} = ${n}/${a}, ${l}))`);
  }
};
qi.default = Dg;
var Mi = {}, Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
function ru(e) {
  const t = e.length;
  let n = 0, a = 0, s;
  for (; a < t; )
    n++, s = e.charCodeAt(a++), s >= 55296 && s <= 56319 && a < t && (s = e.charCodeAt(a), (s & 64512) === 56320 && a++);
  return n;
}
Vi.default = ru;
ru.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(Mi, "__esModule", { value: !0 });
const $t = B, Fg = C, zg = Vi, Ug = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxLength" ? "more" : "fewer";
    return (0, $t.str)`must NOT have ${n} than ${t} characters`;
  },
  params: ({ schemaCode: e }) => (0, $t._)`{limit: ${e}}`
}, qg = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: !0,
  error: Ug,
  code(e) {
    const { keyword: t, data: n, schemaCode: a, it: s } = e, i = t === "maxLength" ? $t.operators.GT : $t.operators.LT, r = s.opts.unicode === !1 ? (0, $t._)`${n}.length` : (0, $t._)`${(0, Fg.useFunc)(e.gen, zg.default)}(${n})`;
    e.fail$data((0, $t._)`${r} ${i} ${a}`);
  }
};
Mi.default = qg;
var Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
const Mg = X, la = B, Vg = {
  message: ({ schemaCode: e }) => (0, la.str)`must match pattern "${e}"`,
  params: ({ schemaCode: e }) => (0, la._)`{pattern: ${e}}`
}, Bg = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: !0,
  error: Vg,
  code(e) {
    const { data: t, $data: n, schema: a, schemaCode: s, it: i } = e, r = i.opts.unicodeRegExp ? "u" : "", l = n ? (0, la._)`(new RegExp(${s}, ${r}))` : (0, Mg.usePattern)(e, a);
    e.fail$data((0, la._)`!${l}.test(${t})`);
  }
};
Bi.default = Bg;
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
const vn = B, Hg = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxProperties" ? "more" : "fewer";
    return (0, vn.str)`must NOT have ${n} than ${t} properties`;
  },
  params: ({ schemaCode: e }) => (0, vn._)`{limit: ${e}}`
}, Gg = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: !0,
  error: Hg,
  code(e) {
    const { keyword: t, data: n, schemaCode: a } = e, s = t === "maxProperties" ? vn.operators.GT : vn.operators.LT;
    e.fail$data((0, vn._)`Object.keys(${n}).length ${s} ${a}`);
  }
};
Hi.default = Gg;
var Gi = {};
Object.defineProperty(Gi, "__esModule", { value: !0 });
const un = X, gn = B, Kg = C, Wg = {
  message: ({ params: { missingProperty: e } }) => (0, gn.str)`must have required property '${e}'`,
  params: ({ params: { missingProperty: e } }) => (0, gn._)`{missingProperty: ${e}}`
}, Xg = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: !0,
  error: Wg,
  code(e) {
    const { gen: t, schema: n, schemaCode: a, data: s, $data: i, it: r } = e, { opts: l } = r;
    if (!i && n.length === 0)
      return;
    const c = n.length >= l.loopRequired;
    if (r.allErrors ? o() : u(), l.strictRequired) {
      const h = e.parentSchema.properties, { definedProperties: m } = e.it;
      for (const y of n)
        if ((h == null ? void 0 : h[y]) === void 0 && !m.has(y)) {
          const g = r.schemaEnv.baseId + r.errSchemaPath, v = `required property "${y}" is not defined at "${g}" (strictRequired)`;
          (0, Kg.checkStrictMode)(r, v, r.opts.strictRequired);
        }
    }
    function o() {
      if (c || i)
        e.block$data(gn.nil, p);
      else
        for (const h of n)
          (0, un.checkReportMissingProp)(e, h);
    }
    function u() {
      const h = t.let("missing");
      if (c || i) {
        const m = t.let("valid", !0);
        e.block$data(m, () => f(h, m)), e.ok(m);
      } else
        t.if((0, un.checkMissingProp)(e, n, h)), (0, un.reportMissingProp)(e, h), t.else();
    }
    function p() {
      t.forOf("prop", a, (h) => {
        e.setParams({ missingProperty: h }), t.if((0, un.noPropertyInData)(t, s, h, l.ownProperties), () => e.error());
      });
    }
    function f(h, m) {
      e.setParams({ missingProperty: h }), t.forOf(h, a, () => {
        t.assign(m, (0, un.propertyInData)(t, s, h, l.ownProperties)), t.if((0, gn.not)(m), () => {
          e.error(), t.break();
        });
      }, gn.nil);
    }
  }
};
Gi.default = Xg;
var Ki = {};
Object.defineProperty(Ki, "__esModule", { value: !0 });
const xn = B, Jg = {
  message({ keyword: e, schemaCode: t }) {
    const n = e === "maxItems" ? "more" : "fewer";
    return (0, xn.str)`must NOT have ${n} than ${t} items`;
  },
  params: ({ schemaCode: e }) => (0, xn._)`{limit: ${e}}`
}, Yg = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: !0,
  error: Jg,
  code(e) {
    const { keyword: t, data: n, schemaCode: a } = e, s = t === "maxItems" ? xn.operators.GT : xn.operators.LT;
    e.fail$data((0, xn._)`${n}.length ${s} ${a}`);
  }
};
Ki.default = Yg;
var Wi = {}, Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
const ou = Al;
ou.code = 'require("ajv/dist/runtime/equal").default';
Pn.default = ou;
Object.defineProperty(Wi, "__esModule", { value: !0 });
const vs = pe, xe = B, Zg = C, Qg = Pn, ex = {
  message: ({ params: { i: e, j: t } }) => (0, xe.str)`must NOT have duplicate items (items ## ${t} and ${e} are identical)`,
  params: ({ params: { i: e, j: t } }) => (0, xe._)`{i: ${e}, j: ${t}}`
}, tx = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: !0,
  error: ex,
  code(e) {
    const { gen: t, data: n, $data: a, schema: s, parentSchema: i, schemaCode: r, it: l } = e;
    if (!a && !s)
      return;
    const c = t.let("valid"), o = i.items ? (0, vs.getSchemaTypes)(i.items) : [];
    e.block$data(c, u, (0, xe._)`${r} === false`), e.ok(c);
    function u() {
      const m = t.let("i", (0, xe._)`${n}.length`), y = t.let("j");
      e.setParams({ i: m, j: y }), t.assign(c, !0), t.if((0, xe._)`${m} > 1`, () => (p() ? f : h)(m, y));
    }
    function p() {
      return o.length > 0 && !o.some((m) => m === "object" || m === "array");
    }
    function f(m, y) {
      const g = t.name("item"), v = (0, vs.checkDataTypes)(o, g, l.opts.strictNumbers, vs.DataType.Wrong), $ = t.const("indices", (0, xe._)`{}`);
      t.for((0, xe._)`;${m}--;`, () => {
        t.let(g, (0, xe._)`${n}[${m}]`), t.if(v, (0, xe._)`continue`), o.length > 1 && t.if((0, xe._)`typeof ${g} == "string"`, (0, xe._)`${g} += "_"`), t.if((0, xe._)`typeof ${$}[${g}] == "number"`, () => {
          t.assign(y, (0, xe._)`${$}[${g}]`), e.error(), t.assign(c, !1).break();
        }).code((0, xe._)`${$}[${g}] = ${m}`);
      });
    }
    function h(m, y) {
      const g = (0, Zg.useFunc)(t, Qg.default), v = t.name("outer");
      t.label(v).for((0, xe._)`;${m}--;`, () => t.for((0, xe._)`${y} = ${m}; ${y}--;`, () => t.if((0, xe._)`${g}(${n}[${m}], ${n}[${y}])`, () => {
        e.error(), t.assign(c, !1).break(v);
      })));
    }
  }
};
Wi.default = tx;
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
const Bs = B, nx = C, ax = Pn, sx = {
  message: "must be equal to constant",
  params: ({ schemaCode: e }) => (0, Bs._)`{allowedValue: ${e}}`
}, ix = {
  keyword: "const",
  $data: !0,
  error: sx,
  code(e) {
    const { gen: t, data: n, $data: a, schemaCode: s, schema: i } = e;
    a || i && typeof i == "object" ? e.fail$data((0, Bs._)`!${(0, nx.useFunc)(t, ax.default)}(${n}, ${s})`) : e.fail((0, Bs._)`${i} !== ${n}`);
  }
};
Xi.default = ix;
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
const mn = B, rx = C, ox = Pn, cx = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode: e }) => (0, mn._)`{allowedValues: ${e}}`
}, lx = {
  keyword: "enum",
  schemaType: "array",
  $data: !0,
  error: cx,
  code(e) {
    const { gen: t, data: n, $data: a, schema: s, schemaCode: i, it: r } = e;
    if (!a && s.length === 0)
      throw new Error("enum must have non-empty array");
    const l = s.length >= r.opts.loopEnum;
    let c;
    const o = () => c ?? (c = (0, rx.useFunc)(t, ox.default));
    let u;
    if (l || a)
      u = t.let("valid"), e.block$data(u, p);
    else {
      if (!Array.isArray(s))
        throw new Error("ajv implementation error");
      const h = t.const("vSchema", i);
      u = (0, mn.or)(...s.map((m, y) => f(h, y)));
    }
    e.pass(u);
    function p() {
      t.assign(u, !1), t.forOf("v", i, (h) => t.if((0, mn._)`${o()}(${n}, ${h})`, () => t.assign(u, !0).break()));
    }
    function f(h, m) {
      const y = s[m];
      return typeof y == "object" && y !== null ? (0, mn._)`${o()}(${n}, ${h}[${m}])` : (0, mn._)`${n} === ${y}`;
    }
  }
};
Ji.default = lx;
Object.defineProperty(ka, "__esModule", { value: !0 });
const ux = Ui, px = qi, dx = Mi, mx = Bi, fx = Hi, hx = Gi, vx = Ki, gx = Wi, xx = Xi, yx = Ji, bx = [
  // number
  ux.default,
  px.default,
  // string
  dx.default,
  mx.default,
  // object
  fx.default,
  hx.default,
  // array
  vx.default,
  gx.default,
  // any
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  xx.default,
  yx.default
];
ka.default = bx;
var ja = {}, Jt = {};
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.validateAdditionalItems = void 0;
const wt = B, Hs = C, $x = {
  message: ({ params: { len: e } }) => (0, wt.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, wt._)`{limit: ${e}}`
}, wx = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: $x,
  code(e) {
    const { parentSchema: t, it: n } = e, { items: a } = t;
    if (!Array.isArray(a)) {
      (0, Hs.checkStrictMode)(n, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    cu(e, a);
  }
};
function cu(e, t) {
  const { gen: n, schema: a, data: s, keyword: i, it: r } = e;
  r.items = !0;
  const l = n.const("len", (0, wt._)`${s}.length`);
  if (a === !1)
    e.setParams({ len: t.length }), e.pass((0, wt._)`${l} <= ${t.length}`);
  else if (typeof a == "object" && !(0, Hs.alwaysValidSchema)(r, a)) {
    const o = n.var("valid", (0, wt._)`${l} <= ${t.length}`);
    n.if((0, wt.not)(o), () => c(o)), e.ok(o);
  }
  function c(o) {
    n.forRange("i", t.length, l, (u) => {
      e.subschema({ keyword: i, dataProp: u, dataPropType: Hs.Type.Num }, o), r.allErrors || n.if((0, wt.not)(o), () => n.break());
    });
  }
}
Jt.validateAdditionalItems = cu;
Jt.default = wx;
var Yi = {}, Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.validateTuple = void 0;
const Po = B, Zn = C, _x = X, Ex = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(e) {
    const { schema: t, it: n } = e;
    if (Array.isArray(t))
      return lu(e, "additionalItems", t);
    n.items = !0, !(0, Zn.alwaysValidSchema)(n, t) && e.ok((0, _x.validateArray)(e));
  }
};
function lu(e, t, n = e.schema) {
  const { gen: a, parentSchema: s, data: i, keyword: r, it: l } = e;
  u(s), l.opts.unevaluated && n.length && l.items !== !0 && (l.items = Zn.mergeEvaluated.items(a, n.length, l.items));
  const c = a.name("valid"), o = a.const("len", (0, Po._)`${i}.length`);
  n.forEach((p, f) => {
    (0, Zn.alwaysValidSchema)(l, p) || (a.if((0, Po._)`${o} > ${f}`, () => e.subschema({
      keyword: r,
      schemaProp: f,
      dataProp: f
    }, c)), e.ok(c));
  });
  function u(p) {
    const { opts: f, errSchemaPath: h } = l, m = n.length, y = m === p.minItems && (m === p.maxItems || p[t] === !1);
    if (f.strictTuples && !y) {
      const g = `"${r}" is ${m}-tuple, but minItems or maxItems/${t} are not specified or different at path "${h}"`;
      (0, Zn.checkStrictMode)(l, g, f.strictTuples);
    }
  }
}
Yt.validateTuple = lu;
Yt.default = Ex;
Object.defineProperty(Yi, "__esModule", { value: !0 });
const Sx = Yt, Rx = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (e) => (0, Sx.validateTuple)(e, "items")
};
Yi.default = Rx;
var Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
const No = B, kx = C, jx = X, Tx = Jt, Ox = {
  message: ({ params: { len: e } }) => (0, No.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, No._)`{limit: ${e}}`
}, Px = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: Ox,
  code(e) {
    const { schema: t, parentSchema: n, it: a } = e, { prefixItems: s } = n;
    a.items = !0, !(0, kx.alwaysValidSchema)(a, t) && (s ? (0, Tx.validateAdditionalItems)(e, s) : e.ok((0, jx.validateArray)(e)));
  }
};
Zi.default = Px;
var Qi = {};
Object.defineProperty(Qi, "__esModule", { value: !0 });
const Ce = B, Fn = C, Nx = {
  message: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ce.str)`must contain at least ${e} valid item(s)` : (0, Ce.str)`must contain at least ${e} and no more than ${t} valid item(s)`,
  params: ({ params: { min: e, max: t } }) => t === void 0 ? (0, Ce._)`{minContains: ${e}}` : (0, Ce._)`{minContains: ${e}, maxContains: ${t}}`
}, Ax = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: !0,
  error: Nx,
  code(e) {
    const { gen: t, schema: n, parentSchema: a, data: s, it: i } = e;
    let r, l;
    const { minContains: c, maxContains: o } = a;
    i.opts.next ? (r = c === void 0 ? 1 : c, l = o) : r = 1;
    const u = t.const("len", (0, Ce._)`${s}.length`);
    if (e.setParams({ min: r, max: l }), l === void 0 && r === 0) {
      (0, Fn.checkStrictMode)(i, '"minContains" == 0 without "maxContains": "contains" keyword ignored');
      return;
    }
    if (l !== void 0 && r > l) {
      (0, Fn.checkStrictMode)(i, '"minContains" > "maxContains" is always invalid'), e.fail();
      return;
    }
    if ((0, Fn.alwaysValidSchema)(i, n)) {
      let y = (0, Ce._)`${u} >= ${r}`;
      l !== void 0 && (y = (0, Ce._)`${y} && ${u} <= ${l}`), e.pass(y);
      return;
    }
    i.items = !0;
    const p = t.name("valid");
    l === void 0 && r === 1 ? h(p, () => t.if(p, () => t.break())) : r === 0 ? (t.let(p, !0), l !== void 0 && t.if((0, Ce._)`${s}.length > 0`, f)) : (t.let(p, !1), f()), e.result(p, () => e.reset());
    function f() {
      const y = t.name("_valid"), g = t.let("count", 0);
      h(y, () => t.if(y, () => m(g)));
    }
    function h(y, g) {
      t.forRange("i", 0, u, (v) => {
        e.subschema({
          keyword: "contains",
          dataProp: v,
          dataPropType: Fn.Type.Num,
          compositeRule: !0
        }, y), g();
      });
    }
    function m(y) {
      t.code((0, Ce._)`${y}++`), l === void 0 ? t.if((0, Ce._)`${y} >= ${r}`, () => t.assign(p, !0).break()) : (t.if((0, Ce._)`${y} > ${l}`, () => t.assign(p, !1).break()), r === 1 ? t.assign(p, !0) : t.if((0, Ce._)`${y} >= ${r}`, () => t.assign(p, !0)));
    }
  }
};
Qi.default = Ax;
var Ta = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.validateSchemaDeps = e.validatePropertyDeps = e.error = void 0;
  const t = B, n = C, a = X;
  e.error = {
    message: ({ params: { property: c, depsCount: o, deps: u } }) => {
      const p = o === 1 ? "property" : "properties";
      return (0, t.str)`must have ${p} ${u} when property ${c} is present`;
    },
    params: ({ params: { property: c, depsCount: o, deps: u, missingProperty: p } }) => (0, t._)`{property: ${c},
    missingProperty: ${p},
    depsCount: ${o},
    deps: ${u}}`
    // TODO change to reference
  };
  const s = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: e.error,
    code(c) {
      const [o, u] = i(c);
      r(c, o), l(c, u);
    }
  };
  function i({ schema: c }) {
    const o = {}, u = {};
    for (const p in c) {
      if (p === "__proto__")
        continue;
      const f = Array.isArray(c[p]) ? o : u;
      f[p] = c[p];
    }
    return [o, u];
  }
  function r(c, o = c.schema) {
    const { gen: u, data: p, it: f } = c;
    if (Object.keys(o).length === 0)
      return;
    const h = u.let("missing");
    for (const m in o) {
      const y = o[m];
      if (y.length === 0)
        continue;
      const g = (0, a.propertyInData)(u, p, m, f.opts.ownProperties);
      c.setParams({
        property: m,
        depsCount: y.length,
        deps: y.join(", ")
      }), f.allErrors ? u.if(g, () => {
        for (const v of y)
          (0, a.checkReportMissingProp)(c, v);
      }) : (u.if((0, t._)`${g} && (${(0, a.checkMissingProp)(c, y, h)})`), (0, a.reportMissingProp)(c, h), u.else());
    }
  }
  e.validatePropertyDeps = r;
  function l(c, o = c.schema) {
    const { gen: u, data: p, keyword: f, it: h } = c, m = u.name("valid");
    for (const y in o)
      (0, n.alwaysValidSchema)(h, o[y]) || (u.if(
        (0, a.propertyInData)(u, p, y, h.opts.ownProperties),
        () => {
          const g = c.subschema({ keyword: f, schemaProp: y }, m);
          c.mergeValidEvaluated(g, m);
        },
        () => u.var(m, !0)
        // TODO var
      ), c.ok(m));
  }
  e.validateSchemaDeps = l, e.default = s;
})(Ta);
var er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
const uu = B, Ix = C, Cx = {
  message: "property name must be valid",
  params: ({ params: e }) => (0, uu._)`{propertyName: ${e.propertyName}}`
}, Lx = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: Cx,
  code(e) {
    const { gen: t, schema: n, data: a, it: s } = e;
    if ((0, Ix.alwaysValidSchema)(s, n))
      return;
    const i = t.name("valid");
    t.forIn("key", a, (r) => {
      e.setParams({ propertyName: r }), e.subschema({
        keyword: "propertyNames",
        data: r,
        dataTypes: ["string"],
        propertyName: r,
        compositeRule: !0
      }, i), t.if((0, uu.not)(i), () => {
        e.error(!0), s.allErrors || t.break();
      });
    }), e.ok(i);
  }
};
er.default = Lx;
var Oa = {};
Object.defineProperty(Oa, "__esModule", { value: !0 });
const zn = X, ze = B, Dx = Ie, Un = C, Fx = {
  message: "must NOT have additional properties",
  params: ({ params: e }) => (0, ze._)`{additionalProperty: ${e.additionalProperty}}`
}, zx = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: !0,
  trackErrors: !0,
  error: Fx,
  code(e) {
    const { gen: t, schema: n, parentSchema: a, data: s, errsCount: i, it: r } = e;
    if (!i)
      throw new Error("ajv implementation error");
    const { allErrors: l, opts: c } = r;
    if (r.props = !0, c.removeAdditional !== "all" && (0, Un.alwaysValidSchema)(r, n))
      return;
    const o = (0, zn.allSchemaProperties)(a.properties), u = (0, zn.allSchemaProperties)(a.patternProperties);
    p(), e.ok((0, ze._)`${i} === ${Dx.default.errors}`);
    function p() {
      t.forIn("key", s, (g) => {
        !o.length && !u.length ? m(g) : t.if(f(g), () => m(g));
      });
    }
    function f(g) {
      let v;
      if (o.length > 8) {
        const $ = (0, Un.schemaRefOrVal)(r, a.properties, "properties");
        v = (0, zn.isOwnProperty)(t, $, g);
      } else o.length ? v = (0, ze.or)(...o.map(($) => (0, ze._)`${g} === ${$}`)) : v = ze.nil;
      return u.length && (v = (0, ze.or)(v, ...u.map(($) => (0, ze._)`${(0, zn.usePattern)(e, $)}.test(${g})`))), (0, ze.not)(v);
    }
    function h(g) {
      t.code((0, ze._)`delete ${s}[${g}]`);
    }
    function m(g) {
      if (c.removeAdditional === "all" || c.removeAdditional && n === !1) {
        h(g);
        return;
      }
      if (n === !1) {
        e.setParams({ additionalProperty: g }), e.error(), l || t.break();
        return;
      }
      if (typeof n == "object" && !(0, Un.alwaysValidSchema)(r, n)) {
        const v = t.name("valid");
        c.removeAdditional === "failing" ? (y(g, v, !1), t.if((0, ze.not)(v), () => {
          e.reset(), h(g);
        })) : (y(g, v), l || t.if((0, ze.not)(v), () => t.break()));
      }
    }
    function y(g, v, $) {
      const E = {
        keyword: "additionalProperties",
        dataProp: g,
        dataPropType: Un.Type.Str
      };
      $ === !1 && Object.assign(E, {
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }), e.subschema(E, v);
    }
  }
};
Oa.default = zx;
var tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
const Ux = De, Ao = X, gs = C, Io = Oa, qx = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, parentSchema: a, data: s, it: i } = e;
    i.opts.removeAdditional === "all" && a.additionalProperties === void 0 && Io.default.code(new Ux.KeywordCxt(i, Io.default, "additionalProperties"));
    const r = (0, Ao.allSchemaProperties)(n);
    for (const p of r)
      i.definedProperties.add(p);
    i.opts.unevaluated && r.length && i.props !== !0 && (i.props = gs.mergeEvaluated.props(t, (0, gs.toHash)(r), i.props));
    const l = r.filter((p) => !(0, gs.alwaysValidSchema)(i, n[p]));
    if (l.length === 0)
      return;
    const c = t.name("valid");
    for (const p of l)
      o(p) ? u(p) : (t.if((0, Ao.propertyInData)(t, s, p, i.opts.ownProperties)), u(p), i.allErrors || t.else().var(c, !0), t.endIf()), e.it.definedProperties.add(p), e.ok(c);
    function o(p) {
      return i.opts.useDefaults && !i.compositeRule && n[p].default !== void 0;
    }
    function u(p) {
      e.subschema({
        keyword: "properties",
        schemaProp: p,
        dataProp: p
      }, c);
    }
  }
};
tr.default = qx;
var nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
const Co = X, qn = B, Lo = C, Do = C, Mx = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(e) {
    const { gen: t, schema: n, data: a, parentSchema: s, it: i } = e, { opts: r } = i, l = (0, Co.allSchemaProperties)(n), c = l.filter((y) => (0, Lo.alwaysValidSchema)(i, n[y]));
    if (l.length === 0 || c.length === l.length && (!i.opts.unevaluated || i.props === !0))
      return;
    const o = r.strictSchema && !r.allowMatchingProperties && s.properties, u = t.name("valid");
    i.props !== !0 && !(i.props instanceof qn.Name) && (i.props = (0, Do.evaluatedPropsToName)(t, i.props));
    const { props: p } = i;
    f();
    function f() {
      for (const y of l)
        o && h(y), i.allErrors ? m(y) : (t.var(u, !0), m(y), t.if(u));
    }
    function h(y) {
      for (const g in o)
        new RegExp(y).test(g) && (0, Lo.checkStrictMode)(i, `property ${g} matches pattern ${y} (use allowMatchingProperties)`);
    }
    function m(y) {
      t.forIn("key", a, (g) => {
        t.if((0, qn._)`${(0, Co.usePattern)(e, y)}.test(${g})`, () => {
          const v = c.includes(y);
          v || e.subschema({
            keyword: "patternProperties",
            schemaProp: y,
            dataProp: g,
            dataPropType: Do.Type.Str
          }, u), i.opts.unevaluated && p !== !0 ? t.assign((0, qn._)`${p}[${g}]`, !0) : !v && !i.allErrors && t.if((0, qn.not)(u), () => t.break());
        });
      });
    }
  }
};
nr.default = Mx;
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
const Vx = C, Bx = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  code(e) {
    const { gen: t, schema: n, it: a } = e;
    if ((0, Vx.alwaysValidSchema)(a, n)) {
      e.fail();
      return;
    }
    const s = t.name("valid");
    e.subschema({
      keyword: "not",
      compositeRule: !0,
      createErrors: !1,
      allErrors: !1
    }, s), e.failResult(s, () => e.reset(), () => e.error());
  },
  error: { message: "must NOT be valid" }
};
ar.default = Bx;
var sr = {};
Object.defineProperty(sr, "__esModule", { value: !0 });
const Hx = X, Gx = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: !0,
  code: Hx.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
sr.default = Gx;
var ir = {};
Object.defineProperty(ir, "__esModule", { value: !0 });
const Qn = B, Kx = C, Wx = {
  message: "must match exactly one schema in oneOf",
  params: ({ params: e }) => (0, Qn._)`{passingSchemas: ${e.passing}}`
}, Xx = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: !0,
  error: Wx,
  code(e) {
    const { gen: t, schema: n, parentSchema: a, it: s } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    if (s.opts.discriminator && a.discriminator)
      return;
    const i = n, r = t.let("valid", !1), l = t.let("passing", null), c = t.name("_valid");
    e.setParams({ passing: l }), t.block(o), e.result(r, () => e.reset(), () => e.error(!0));
    function o() {
      i.forEach((u, p) => {
        let f;
        (0, Kx.alwaysValidSchema)(s, u) ? t.var(c, !0) : f = e.subschema({
          keyword: "oneOf",
          schemaProp: p,
          compositeRule: !0
        }, c), p > 0 && t.if((0, Qn._)`${c} && ${r}`).assign(r, !1).assign(l, (0, Qn._)`[${l}, ${p}]`).else(), t.if(c, () => {
          t.assign(r, !0), t.assign(l, p), f && e.mergeEvaluated(f, Qn.Name);
        });
      });
    }
  }
};
ir.default = Xx;
var rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
const Jx = C, Yx = {
  keyword: "allOf",
  schemaType: "array",
  code(e) {
    const { gen: t, schema: n, it: a } = e;
    if (!Array.isArray(n))
      throw new Error("ajv implementation error");
    const s = t.name("valid");
    n.forEach((i, r) => {
      if ((0, Jx.alwaysValidSchema)(a, i))
        return;
      const l = e.subschema({ keyword: "allOf", schemaProp: r }, s);
      e.ok(s), e.mergeEvaluated(l);
    });
  }
};
rr.default = Yx;
var or = {};
Object.defineProperty(or, "__esModule", { value: !0 });
const ua = B, pu = C, Zx = {
  message: ({ params: e }) => (0, ua.str)`must match "${e.ifClause}" schema`,
  params: ({ params: e }) => (0, ua._)`{failingKeyword: ${e.ifClause}}`
}, Qx = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: !0,
  error: Zx,
  code(e) {
    const { gen: t, parentSchema: n, it: a } = e;
    n.then === void 0 && n.else === void 0 && (0, pu.checkStrictMode)(a, '"if" without "then" and "else" is ignored');
    const s = Fo(a, "then"), i = Fo(a, "else");
    if (!s && !i)
      return;
    const r = t.let("valid", !0), l = t.name("_valid");
    if (c(), e.reset(), s && i) {
      const u = t.let("ifClause");
      e.setParams({ ifClause: u }), t.if(l, o("then", u), o("else", u));
    } else s ? t.if(l, o("then")) : t.if((0, ua.not)(l), o("else"));
    e.pass(r, () => e.error(!0));
    function c() {
      const u = e.subschema({
        keyword: "if",
        compositeRule: !0,
        createErrors: !1,
        allErrors: !1
      }, l);
      e.mergeEvaluated(u);
    }
    function o(u, p) {
      return () => {
        const f = e.subschema({ keyword: u }, l);
        t.assign(r, l), e.mergeValidEvaluated(f, r), p ? t.assign(p, (0, ua._)`${u}`) : e.setParams({ ifClause: u });
      };
    }
  }
};
function Fo(e, t) {
  const n = e.schema[t];
  return n !== void 0 && !(0, pu.alwaysValidSchema)(e, n);
}
or.default = Qx;
var cr = {};
Object.defineProperty(cr, "__esModule", { value: !0 });
const ey = C, ty = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: e, parentSchema: t, it: n }) {
    t.if === void 0 && (0, ey.checkStrictMode)(n, `"${e}" without "if" is ignored`);
  }
};
cr.default = ty;
Object.defineProperty(ja, "__esModule", { value: !0 });
const ny = Jt, ay = Yi, sy = Yt, iy = Zi, ry = Qi, oy = Ta, cy = er, ly = Oa, uy = tr, py = nr, dy = ar, my = sr, fy = ir, hy = rr, vy = or, gy = cr;
function xy(e = !1) {
  const t = [
    // any
    dy.default,
    my.default,
    fy.default,
    hy.default,
    vy.default,
    gy.default,
    // object
    cy.default,
    ly.default,
    oy.default,
    uy.default,
    py.default
  ];
  return e ? t.push(ay.default, iy.default) : t.push(ny.default, sy.default), t.push(ry.default), t;
}
ja.default = xy;
var lr = {}, Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.dynamicAnchor = void 0;
const xs = B, yy = Ie, zo = Re, by = at, $y = {
  keyword: "$dynamicAnchor",
  schemaType: "string",
  code: (e) => du(e, e.schema)
};
function du(e, t) {
  const { gen: n, it: a } = e;
  a.schemaEnv.root.dynamicAnchors[t] = !0;
  const s = (0, xs._)`${yy.default.dynamicAnchors}${(0, xs.getProperty)(t)}`, i = a.errSchemaPath === "#" ? a.validateName : wy(e);
  n.if((0, xs._)`!${s}`, () => n.assign(s, i));
}
Zt.dynamicAnchor = du;
function wy(e) {
  const { schemaEnv: t, schema: n, self: a } = e.it, { root: s, baseId: i, localRefs: r, meta: l } = t.root, { schemaId: c } = a.opts, o = new zo.SchemaEnv({ schema: n, schemaId: c, root: s, baseId: i, localRefs: r, meta: l });
  return zo.compileSchema.call(a, o), (0, by.getValidate)(e, o);
}
Zt.default = $y;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.dynamicRef = void 0;
const Uo = B, _y = Ie, qo = at, Ey = {
  keyword: "$dynamicRef",
  schemaType: "string",
  code: (e) => mu(e, e.schema)
};
function mu(e, t) {
  const { gen: n, keyword: a, it: s } = e;
  if (t[0] !== "#")
    throw new Error(`"${a}" only supports hash fragment reference`);
  const i = t.slice(1);
  if (s.allErrors)
    r();
  else {
    const c = n.let("valid", !1);
    r(c), e.ok(c);
  }
  function r(c) {
    if (s.schemaEnv.root.dynamicAnchors[i]) {
      const o = n.let("_v", (0, Uo._)`${_y.default.dynamicAnchors}${(0, Uo.getProperty)(i)}`);
      n.if(o, l(o, c), l(s.validateName, c));
    } else
      l(s.validateName, c)();
  }
  function l(c, o) {
    return o ? () => n.block(() => {
      (0, qo.callRef)(e, c), n.let(o, !0);
    }) : () => (0, qo.callRef)(e, c);
  }
}
Qt.dynamicRef = mu;
Qt.default = Ey;
var ur = {};
Object.defineProperty(ur, "__esModule", { value: !0 });
const Sy = Zt, Ry = C, ky = {
  keyword: "$recursiveAnchor",
  schemaType: "boolean",
  code(e) {
    e.schema ? (0, Sy.dynamicAnchor)(e, "") : (0, Ry.checkStrictMode)(e.it, "$recursiveAnchor: false is ignored");
  }
};
ur.default = ky;
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
const jy = Qt, Ty = {
  keyword: "$recursiveRef",
  schemaType: "string",
  code: (e) => (0, jy.dynamicRef)(e, e.schema)
};
pr.default = Ty;
Object.defineProperty(lr, "__esModule", { value: !0 });
const Oy = Zt, Py = Qt, Ny = ur, Ay = pr, Iy = [Oy.default, Py.default, Ny.default, Ay.default];
lr.default = Iy;
var dr = {}, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
const Mo = Ta, Cy = {
  keyword: "dependentRequired",
  type: "object",
  schemaType: "object",
  error: Mo.error,
  code: (e) => (0, Mo.validatePropertyDeps)(e)
};
mr.default = Cy;
var fr = {};
Object.defineProperty(fr, "__esModule", { value: !0 });
const Ly = Ta, Dy = {
  keyword: "dependentSchemas",
  type: "object",
  schemaType: "object",
  code: (e) => (0, Ly.validateSchemaDeps)(e)
};
fr.default = Dy;
var hr = {};
Object.defineProperty(hr, "__esModule", { value: !0 });
const Fy = C, zy = {
  keyword: ["maxContains", "minContains"],
  type: "array",
  schemaType: "number",
  code({ keyword: e, parentSchema: t, it: n }) {
    t.contains === void 0 && (0, Fy.checkStrictMode)(n, `"${e}" without "contains" is ignored`);
  }
};
hr.default = zy;
Object.defineProperty(dr, "__esModule", { value: !0 });
const Uy = mr, qy = fr, My = hr, Vy = [Uy.default, qy.default, My.default];
dr.default = Vy;
var vr = {}, gr = {};
Object.defineProperty(gr, "__esModule", { value: !0 });
const pt = B, Vo = C, By = Ie, Hy = {
  message: "must NOT have unevaluated properties",
  params: ({ params: e }) => (0, pt._)`{unevaluatedProperty: ${e.unevaluatedProperty}}`
}, Gy = {
  keyword: "unevaluatedProperties",
  type: "object",
  schemaType: ["boolean", "object"],
  trackErrors: !0,
  error: Hy,
  code(e) {
    const { gen: t, schema: n, data: a, errsCount: s, it: i } = e;
    if (!s)
      throw new Error("ajv implementation error");
    const { allErrors: r, props: l } = i;
    l instanceof pt.Name ? t.if((0, pt._)`${l} !== true`, () => t.forIn("key", a, (p) => t.if(o(l, p), () => c(p)))) : l !== !0 && t.forIn("key", a, (p) => l === void 0 ? c(p) : t.if(u(l, p), () => c(p))), i.props = !0, e.ok((0, pt._)`${s} === ${By.default.errors}`);
    function c(p) {
      if (n === !1) {
        e.setParams({ unevaluatedProperty: p }), e.error(), r || t.break();
        return;
      }
      if (!(0, Vo.alwaysValidSchema)(i, n)) {
        const f = t.name("valid");
        e.subschema({
          keyword: "unevaluatedProperties",
          dataProp: p,
          dataPropType: Vo.Type.Str
        }, f), r || t.if((0, pt.not)(f), () => t.break());
      }
    }
    function o(p, f) {
      return (0, pt._)`!${p} || !${p}[${f}]`;
    }
    function u(p, f) {
      const h = [];
      for (const m in p)
        p[m] === !0 && h.push((0, pt._)`${f} !== ${m}`);
      return (0, pt.and)(...h);
    }
  }
};
gr.default = Gy;
var xr = {};
Object.defineProperty(xr, "__esModule", { value: !0 });
const _t = B, Bo = C, Ky = {
  message: ({ params: { len: e } }) => (0, _t.str)`must NOT have more than ${e} items`,
  params: ({ params: { len: e } }) => (0, _t._)`{limit: ${e}}`
}, Wy = {
  keyword: "unevaluatedItems",
  type: "array",
  schemaType: ["boolean", "object"],
  error: Ky,
  code(e) {
    const { gen: t, schema: n, data: a, it: s } = e, i = s.items || 0;
    if (i === !0)
      return;
    const r = t.const("len", (0, _t._)`${a}.length`);
    if (n === !1)
      e.setParams({ len: i }), e.fail((0, _t._)`${r} > ${i}`);
    else if (typeof n == "object" && !(0, Bo.alwaysValidSchema)(s, n)) {
      const c = t.var("valid", (0, _t._)`${r} <= ${i}`);
      t.if((0, _t.not)(c), () => l(c, i)), e.ok(c);
    }
    s.items = !0;
    function l(c, o) {
      t.forRange("i", o, r, (u) => {
        e.subschema({ keyword: "unevaluatedItems", dataProp: u, dataPropType: Bo.Type.Num }, c), s.allErrors || t.if((0, _t.not)(c), () => t.break());
      });
    }
  }
};
xr.default = Wy;
Object.defineProperty(vr, "__esModule", { value: !0 });
const Xy = gr, Jy = xr, Yy = [Xy.default, Jy.default];
vr.default = Yy;
var Pa = {}, yr = {};
Object.defineProperty(yr, "__esModule", { value: !0 });
const ue = B, Zy = {
  message: ({ schemaCode: e }) => (0, ue.str)`must match format "${e}"`,
  params: ({ schemaCode: e }) => (0, ue._)`{format: ${e}}`
}, Qy = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: !0,
  error: Zy,
  code(e, t) {
    const { gen: n, data: a, $data: s, schema: i, schemaCode: r, it: l } = e, { opts: c, errSchemaPath: o, schemaEnv: u, self: p } = l;
    if (!c.validateFormats)
      return;
    s ? f() : h();
    function f() {
      const m = n.scopeValue("formats", {
        ref: p.formats,
        code: c.code.formats
      }), y = n.const("fDef", (0, ue._)`${m}[${r}]`), g = n.let("fType"), v = n.let("format");
      n.if((0, ue._)`typeof ${y} == "object" && !(${y} instanceof RegExp)`, () => n.assign(g, (0, ue._)`${y}.type || "string"`).assign(v, (0, ue._)`${y}.validate`), () => n.assign(g, (0, ue._)`"string"`).assign(v, y)), e.fail$data((0, ue.or)($(), E()));
      function $() {
        return c.strictSchema === !1 ? ue.nil : (0, ue._)`${r} && !${v}`;
      }
      function E() {
        const O = u.$async ? (0, ue._)`(${y}.async ? await ${v}(${a}) : ${v}(${a}))` : (0, ue._)`${v}(${a})`, P = (0, ue._)`(typeof ${v} == "function" ? ${O} : ${v}.test(${a}))`;
        return (0, ue._)`${v} && ${v} !== true && ${g} === ${t} && !${P}`;
      }
    }
    function h() {
      const m = p.formats[i];
      if (!m) {
        $();
        return;
      }
      if (m === !0)
        return;
      const [y, g, v] = E(m);
      y === t && e.pass(O());
      function $() {
        if (c.strictSchema === !1) {
          p.logger.warn(P());
          return;
        }
        throw new Error(P());
        function P() {
          return `unknown format "${i}" ignored in schema at path "${o}"`;
        }
      }
      function E(P) {
        const H = P instanceof RegExp ? (0, ue.regexpCode)(P) : c.code.formats ? (0, ue._)`${c.code.formats}${(0, ue.getProperty)(i)}` : void 0, W = n.scopeValue("formats", { key: i, ref: P, code: H });
        return typeof P == "object" && !(P instanceof RegExp) ? [P.type || "string", P.validate, (0, ue._)`${W}.validate`] : ["string", P, W];
      }
      function O() {
        if (typeof m == "object" && !(m instanceof RegExp) && m.async) {
          if (!u.$async)
            throw new Error("async format in sync schema");
          return (0, ue._)`await ${v}(${a})`;
        }
        return typeof g == "function" ? (0, ue._)`${v}(${a})` : (0, ue._)`${v}.test(${a})`;
      }
    }
  }
};
yr.default = Qy;
Object.defineProperty(Pa, "__esModule", { value: !0 });
const eb = yr, tb = [eb.default];
Pa.default = tb;
var Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.contentVocabulary = Pt.metadataVocabulary = void 0;
Pt.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
Pt.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(Fi, "__esModule", { value: !0 });
const nb = Ra, ab = ka, sb = ja, ib = lr, rb = dr, ob = vr, cb = Pa, Ho = Pt, lb = [
  ib.default,
  nb.default,
  ab.default,
  (0, sb.default)(!0),
  cb.default,
  Ho.metadataVocabulary,
  Ho.contentVocabulary,
  rb.default,
  ob.default
];
Fi.default = lb;
var Na = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
Aa.DiscrError = void 0;
var Go;
(function(e) {
  e.Tag = "tag", e.Mapping = "mapping";
})(Go || (Aa.DiscrError = Go = {}));
Object.defineProperty(Na, "__esModule", { value: !0 });
const zt = B, Gs = Aa, Ko = Re, ub = Nt, pb = C, db = {
  message: ({ params: { discrError: e, tagName: t } }) => e === Gs.DiscrError.Tag ? `tag "${t}" must be string` : `value of tag "${t}" must be in oneOf`,
  params: ({ params: { discrError: e, tag: t, tagName: n } }) => (0, zt._)`{error: ${e}, tag: ${n}, tagValue: ${t}}`
}, mb = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error: db,
  code(e) {
    const { gen: t, data: n, schema: a, parentSchema: s, it: i } = e, { oneOf: r } = s;
    if (!i.opts.discriminator)
      throw new Error("discriminator: requires discriminator option");
    const l = a.propertyName;
    if (typeof l != "string")
      throw new Error("discriminator: requires propertyName");
    if (a.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!r)
      throw new Error("discriminator: requires oneOf keyword");
    const c = t.let("valid", !1), o = t.const("tag", (0, zt._)`${n}${(0, zt.getProperty)(l)}`);
    t.if((0, zt._)`typeof ${o} == "string"`, () => u(), () => e.error(!1, { discrError: Gs.DiscrError.Tag, tag: o, tagName: l })), e.ok(c);
    function u() {
      const h = f();
      t.if(!1);
      for (const m in h)
        t.elseIf((0, zt._)`${o} === ${m}`), t.assign(c, p(h[m]));
      t.else(), e.error(!1, { discrError: Gs.DiscrError.Mapping, tag: o, tagName: l }), t.endIf();
    }
    function p(h) {
      const m = t.name("valid"), y = e.subschema({ keyword: "oneOf", schemaProp: h }, m);
      return e.mergeEvaluated(y, zt.Name), m;
    }
    function f() {
      var h;
      const m = {}, y = v(s);
      let g = !0;
      for (let O = 0; O < r.length; O++) {
        let P = r[O];
        if (P != null && P.$ref && !(0, pb.schemaHasRulesButRef)(P, i.self.RULES)) {
          const W = P.$ref;
          if (P = Ko.resolveRef.call(i.self, i.schemaEnv.root, i.baseId, W), P instanceof Ko.SchemaEnv && (P = P.schema), P === void 0)
            throw new ub.default(i.opts.uriResolver, i.baseId, W);
        }
        const H = (h = P == null ? void 0 : P.properties) === null || h === void 0 ? void 0 : h[l];
        if (typeof H != "object")
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${l}"`);
        g = g && (y || v(P)), $(H, O);
      }
      if (!g)
        throw new Error(`discriminator: "${l}" must be required`);
      return m;
      function v({ required: O }) {
        return Array.isArray(O) && O.includes(l);
      }
      function $(O, P) {
        if (O.const)
          E(O.const, P);
        else if (O.enum)
          for (const H of O.enum)
            E(H, P);
        else
          throw new Error(`discriminator: "properties/${l}" must have "const" or "enum"`);
      }
      function E(O, P) {
        if (typeof O != "string" || O in m)
          throw new Error(`discriminator: "${l}" values must be unique strings`);
        m[O] = P;
      }
    }
  }
};
Na.default = mb;
var br = {};
const fb = "https://json-schema.org/draft/2020-12/schema", hb = "https://json-schema.org/draft/2020-12/schema", vb = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0,
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0,
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0,
  "https://json-schema.org/draft/2020-12/vocab/validation": !0,
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0,
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0,
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, gb = "meta", xb = "Core and Validation specifications meta-schema", yb = [
  {
    $ref: "meta/core"
  },
  {
    $ref: "meta/applicator"
  },
  {
    $ref: "meta/unevaluated"
  },
  {
    $ref: "meta/validation"
  },
  {
    $ref: "meta/meta-data"
  },
  {
    $ref: "meta/format-annotation"
  },
  {
    $ref: "meta/content"
  }
], bb = [
  "object",
  "boolean"
], $b = "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.", wb = {
  definitions: {
    $comment: '"definitions" has been replaced by "$defs".',
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    deprecated: !0,
    default: {}
  },
  dependencies: {
    $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $dynamicRef: "#meta"
        },
        {
          $ref: "meta/validation#/$defs/stringArray"
        }
      ]
    },
    deprecated: !0,
    default: {}
  },
  $recursiveAnchor: {
    $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
    $ref: "meta/core#/$defs/anchorString",
    deprecated: !0
  },
  $recursiveRef: {
    $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
    $ref: "meta/core#/$defs/uriReferenceString",
    deprecated: !0
  }
}, _b = {
  $schema: fb,
  $id: hb,
  $vocabulary: vb,
  $dynamicAnchor: gb,
  title: xb,
  allOf: yb,
  type: bb,
  $comment: $b,
  properties: wb
}, Eb = "https://json-schema.org/draft/2020-12/schema", Sb = "https://json-schema.org/draft/2020-12/meta/applicator", Rb = {
  "https://json-schema.org/draft/2020-12/vocab/applicator": !0
}, kb = "meta", jb = "Applicator vocabulary meta-schema", Tb = [
  "object",
  "boolean"
], Ob = {
  prefixItems: {
    $ref: "#/$defs/schemaArray"
  },
  items: {
    $dynamicRef: "#meta"
  },
  contains: {
    $dynamicRef: "#meta"
  },
  additionalProperties: {
    $dynamicRef: "#meta"
  },
  properties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependentSchemas: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    },
    default: {}
  },
  propertyNames: {
    $dynamicRef: "#meta"
  },
  if: {
    $dynamicRef: "#meta"
  },
  then: {
    $dynamicRef: "#meta"
  },
  else: {
    $dynamicRef: "#meta"
  },
  allOf: {
    $ref: "#/$defs/schemaArray"
  },
  anyOf: {
    $ref: "#/$defs/schemaArray"
  },
  oneOf: {
    $ref: "#/$defs/schemaArray"
  },
  not: {
    $dynamicRef: "#meta"
  }
}, Pb = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $dynamicRef: "#meta"
    }
  }
}, Nb = {
  $schema: Eb,
  $id: Sb,
  $vocabulary: Rb,
  $dynamicAnchor: kb,
  title: jb,
  type: Tb,
  properties: Ob,
  $defs: Pb
}, Ab = "https://json-schema.org/draft/2020-12/schema", Ib = "https://json-schema.org/draft/2020-12/meta/unevaluated", Cb = {
  "https://json-schema.org/draft/2020-12/vocab/unevaluated": !0
}, Lb = "meta", Db = "Unevaluated applicator vocabulary meta-schema", Fb = [
  "object",
  "boolean"
], zb = {
  unevaluatedItems: {
    $dynamicRef: "#meta"
  },
  unevaluatedProperties: {
    $dynamicRef: "#meta"
  }
}, Ub = {
  $schema: Ab,
  $id: Ib,
  $vocabulary: Cb,
  $dynamicAnchor: Lb,
  title: Db,
  type: Fb,
  properties: zb
}, qb = "https://json-schema.org/draft/2020-12/schema", Mb = "https://json-schema.org/draft/2020-12/meta/content", Vb = {
  "https://json-schema.org/draft/2020-12/vocab/content": !0
}, Bb = "meta", Hb = "Content vocabulary meta-schema", Gb = [
  "object",
  "boolean"
], Kb = {
  contentEncoding: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentSchema: {
    $dynamicRef: "#meta"
  }
}, Wb = {
  $schema: qb,
  $id: Mb,
  $vocabulary: Vb,
  $dynamicAnchor: Bb,
  title: Hb,
  type: Gb,
  properties: Kb
}, Xb = "https://json-schema.org/draft/2020-12/schema", Jb = "https://json-schema.org/draft/2020-12/meta/core", Yb = {
  "https://json-schema.org/draft/2020-12/vocab/core": !0
}, Zb = "meta", Qb = "Core vocabulary meta-schema", e$ = [
  "object",
  "boolean"
], t$ = {
  $id: {
    $ref: "#/$defs/uriReferenceString",
    $comment: "Non-empty fragments not allowed.",
    pattern: "^[^#]*#?$"
  },
  $schema: {
    $ref: "#/$defs/uriString"
  },
  $ref: {
    $ref: "#/$defs/uriReferenceString"
  },
  $anchor: {
    $ref: "#/$defs/anchorString"
  },
  $dynamicRef: {
    $ref: "#/$defs/uriReferenceString"
  },
  $dynamicAnchor: {
    $ref: "#/$defs/anchorString"
  },
  $vocabulary: {
    type: "object",
    propertyNames: {
      $ref: "#/$defs/uriString"
    },
    additionalProperties: {
      type: "boolean"
    }
  },
  $comment: {
    type: "string"
  },
  $defs: {
    type: "object",
    additionalProperties: {
      $dynamicRef: "#meta"
    }
  }
}, n$ = {
  anchorString: {
    type: "string",
    pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
  },
  uriString: {
    type: "string",
    format: "uri"
  },
  uriReferenceString: {
    type: "string",
    format: "uri-reference"
  }
}, a$ = {
  $schema: Xb,
  $id: Jb,
  $vocabulary: Yb,
  $dynamicAnchor: Zb,
  title: Qb,
  type: e$,
  properties: t$,
  $defs: n$
}, s$ = "https://json-schema.org/draft/2020-12/schema", i$ = "https://json-schema.org/draft/2020-12/meta/format-annotation", r$ = {
  "https://json-schema.org/draft/2020-12/vocab/format-annotation": !0
}, o$ = "meta", c$ = "Format vocabulary meta-schema for annotation results", l$ = [
  "object",
  "boolean"
], u$ = {
  format: {
    type: "string"
  }
}, p$ = {
  $schema: s$,
  $id: i$,
  $vocabulary: r$,
  $dynamicAnchor: o$,
  title: c$,
  type: l$,
  properties: u$
}, d$ = "https://json-schema.org/draft/2020-12/schema", m$ = "https://json-schema.org/draft/2020-12/meta/meta-data", f$ = {
  "https://json-schema.org/draft/2020-12/vocab/meta-data": !0
}, h$ = "meta", v$ = "Meta-data vocabulary meta-schema", g$ = [
  "object",
  "boolean"
], x$ = {
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  deprecated: {
    type: "boolean",
    default: !1
  },
  readOnly: {
    type: "boolean",
    default: !1
  },
  writeOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  }
}, y$ = {
  $schema: d$,
  $id: m$,
  $vocabulary: f$,
  $dynamicAnchor: h$,
  title: v$,
  type: g$,
  properties: x$
}, b$ = "https://json-schema.org/draft/2020-12/schema", $$ = "https://json-schema.org/draft/2020-12/meta/validation", w$ = {
  "https://json-schema.org/draft/2020-12/vocab/validation": !0
}, _$ = "meta", E$ = "Validation vocabulary meta-schema", S$ = [
  "object",
  "boolean"
], R$ = {
  type: {
    anyOf: [
      {
        $ref: "#/$defs/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/$defs/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  const: !0,
  enum: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  maxItems: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  maxContains: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minContains: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 1
  },
  maxProperties: {
    $ref: "#/$defs/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/$defs/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/$defs/stringArray"
  },
  dependentRequired: {
    type: "object",
    additionalProperties: {
      $ref: "#/$defs/stringArray"
    }
  }
}, k$ = {
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    $ref: "#/$defs/nonNegativeInteger",
    default: 0
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, j$ = {
  $schema: b$,
  $id: $$,
  $vocabulary: w$,
  $dynamicAnchor: _$,
  title: E$,
  type: S$,
  properties: R$,
  $defs: k$
};
Object.defineProperty(br, "__esModule", { value: !0 });
const T$ = _b, O$ = Nb, P$ = Ub, N$ = Wb, A$ = a$, I$ = p$, C$ = y$, L$ = j$, D$ = ["/properties"];
function F$(e) {
  return [
    T$,
    O$,
    P$,
    N$,
    A$,
    t(this, I$),
    C$,
    t(this, L$)
  ].forEach((n) => this.addMetaSchema(n, void 0, !1)), this;
  function t(n, a) {
    return e ? n.$dataMetaSchema(a, D$) : a;
  }
}
br.default = F$;
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv2020 = void 0;
  const n = _i, a = Fi, s = Na, i = br, r = "https://json-schema.org/draft/2020-12/schema";
  class l extends n.default {
    constructor(h = {}) {
      super({
        ...h,
        dynamicRef: !0,
        next: !0,
        unevaluated: !0
      });
    }
    _addVocabularies() {
      super._addVocabularies(), a.default.forEach((h) => this.addVocabulary(h)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      const { $data: h, meta: m } = this.opts;
      m && (i.default.call(this, h), this.refs["http://json-schema.org/schema"] = r);
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(r) ? r : void 0);
    }
  }
  t.Ajv2020 = l, e.exports = t = l, e.exports.Ajv2020 = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
  var c = De;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return c.KeywordCxt;
  } });
  var o = B;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return o._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return o.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return o.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return o.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return o.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return o.CodeGen;
  } });
  var u = Xt;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return u.default;
  } });
  var p = Nt;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return p.default;
  } });
})(Fs, Fs.exports);
var z$ = Fs.exports, Ks = { exports: {} }, fu = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatNames = e.fastFormats = e.fullFormats = void 0;
  function t(q, M) {
    return { validate: q, compare: M };
  }
  e.fullFormats = {
    // date: http://tools.ietf.org/html/rfc3339#section-5.6
    date: t(i, r),
    // date-time: http://tools.ietf.org/html/rfc3339#section-5.6
    time: t(c(!0), o),
    "date-time": t(f(!0), h),
    "iso-time": t(c(), u),
    "iso-date-time": t(f(), m),
    // duration: https://tools.ietf.org/html/rfc3339#appendix-A
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri: v,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    // uri-template: https://tools.ietf.org/html/rfc6570
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    // For the source: https://gist.github.com/dperini/729294
    // For test cases: https://mathiasbynens.be/demo/url-regex
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    // optimized https://www.safaribooksonline.com/library/view/regular-expressions-cookbook/9780596802837/ch07s16.html
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex: he,
    // uuid: http://tools.ietf.org/html/rfc4122
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    // JSON-pointer: https://tools.ietf.org/html/rfc6901
    // uri fragment: https://tools.ietf.org/html/rfc3986#appendix-A
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    // relative JSON-pointer: http://tools.ietf.org/html/draft-luff-relative-json-pointer-00
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    // the following formats are used by the openapi specification: https://spec.openapis.org/oas/v3.0.0#data-types
    // byte: https://github.com/miguelmota/is-base64
    byte: E,
    // signed 32 bit integer
    int32: { type: "number", validate: H },
    // signed 64 bit integer
    int64: { type: "number", validate: W },
    // C-type float
    float: { type: "number", validate: se },
    // C-type double
    double: { type: "number", validate: se },
    // hint to the UI to hide input strings
    password: !0,
    // unchecked string payload
    binary: !0
  }, e.fastFormats = {
    ...e.fullFormats,
    date: t(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, r),
    time: t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, o),
    "date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\dt(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, h),
    "iso-time": t(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, u),
    "iso-date-time": t(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, m),
    // uri: https://github.com/mafintosh/is-my-json-valid/blob/master/formats.js
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    // email (sources from jsen validator):
    // http://stackoverflow.com/questions/201323/using-a-regular-expression-to-validate-an-email-address#answer-8829363
    // http://www.w3.org/TR/html5/forms.html#valid-e-mail-address (search for 'wilful violation')
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  }, e.formatNames = Object.keys(e.fullFormats);
  function n(q) {
    return q % 4 === 0 && (q % 100 !== 0 || q % 400 === 0);
  }
  const a = /^(\d\d\d\d)-(\d\d)-(\d\d)$/, s = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function i(q) {
    const M = a.exec(q);
    if (!M)
      return !1;
    const te = +M[1], j = +M[2], N = +M[3];
    return j >= 1 && j <= 12 && N >= 1 && N <= (j === 2 && n(te) ? 29 : s[j]);
  }
  function r(q, M) {
    if (q && M)
      return q > M ? 1 : q < M ? -1 : 0;
  }
  const l = /^(\d\d):(\d\d):(\d\d(?:\.\d+)?)(z|([+-])(\d\d)(?::?(\d\d))?)?$/i;
  function c(q) {
    return function(te) {
      const j = l.exec(te);
      if (!j)
        return !1;
      const N = +j[1], F = +j[2], T = +j[3], A = j[4], I = j[5] === "-" ? -1 : 1, R = +(j[6] || 0), b = +(j[7] || 0);
      if (R > 23 || b > 59 || q && !A)
        return !1;
      if (N <= 23 && F <= 59 && T < 60)
        return !0;
      const S = F - b * I, w = N - R * I - (S < 0 ? 1 : 0);
      return (w === 23 || w === -1) && (S === 59 || S === -1) && T < 61;
    };
  }
  function o(q, M) {
    if (!(q && M))
      return;
    const te = (/* @__PURE__ */ new Date("2020-01-01T" + q)).valueOf(), j = (/* @__PURE__ */ new Date("2020-01-01T" + M)).valueOf();
    if (te && j)
      return te - j;
  }
  function u(q, M) {
    if (!(q && M))
      return;
    const te = l.exec(q), j = l.exec(M);
    if (te && j)
      return q = te[1] + te[2] + te[3], M = j[1] + j[2] + j[3], q > M ? 1 : q < M ? -1 : 0;
  }
  const p = /t|\s/i;
  function f(q) {
    const M = c(q);
    return function(j) {
      const N = j.split(p);
      return N.length === 2 && i(N[0]) && M(N[1]);
    };
  }
  function h(q, M) {
    if (!(q && M))
      return;
    const te = new Date(q).valueOf(), j = new Date(M).valueOf();
    if (te && j)
      return te - j;
  }
  function m(q, M) {
    if (!(q && M))
      return;
    const [te, j] = q.split(p), [N, F] = M.split(p), T = r(te, N);
    if (T !== void 0)
      return T || o(j, F);
  }
  const y = /\/|:/, g = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function v(q) {
    return y.test(q) && g.test(q);
  }
  const $ = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function E(q) {
    return $.lastIndex = 0, $.test(q);
  }
  const O = -(2 ** 31), P = 2 ** 31 - 1;
  function H(q) {
    return Number.isInteger(q) && q <= P && q >= O;
  }
  function W(q) {
    return Number.isInteger(q);
  }
  function se() {
    return !0;
  }
  const ce = /[^\\]\\Z/;
  function he(q) {
    if (ce.test(q))
      return !1;
    try {
      return new RegExp(q), !0;
    } catch {
      return !1;
    }
  }
})(fu);
var hu = {}, Ws = { exports: {} }, $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
const U$ = Ra, q$ = ka, M$ = ja, V$ = Pa, Wo = Pt, B$ = [
  U$.default,
  q$.default,
  (0, M$.default)(),
  V$.default,
  Wo.metadataVocabulary,
  Wo.contentVocabulary
];
$r.default = B$;
const H$ = "http://json-schema.org/draft-07/schema#", G$ = "http://json-schema.org/draft-07/schema#", K$ = "Core schema meta-schema", W$ = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        default: 0
      }
    ]
  },
  simpleTypes: {
    enum: [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: !0,
    default: []
  }
}, X$ = [
  "object",
  "boolean"
], J$ = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  default: !0,
  readOnly: {
    type: "boolean",
    default: !1
  },
  examples: {
    type: "array",
    items: !0
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    default: !0
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    default: !1
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    default: {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    default: {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  const: !0,
  enum: {
    type: "array",
    items: !0,
    minItems: 1,
    uniqueItems: !0
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: !0
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  if: {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  else: {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
}, Y$ = {
  $schema: H$,
  $id: G$,
  title: K$,
  definitions: W$,
  type: X$,
  properties: J$,
  default: !0
};
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 }), t.MissingRefError = t.ValidationError = t.CodeGen = t.Name = t.nil = t.stringify = t.str = t._ = t.KeywordCxt = t.Ajv = void 0;
  const n = _i, a = $r, s = Na, i = Y$, r = ["/properties"], l = "http://json-schema.org/draft-07/schema";
  class c extends n.default {
    _addVocabularies() {
      super._addVocabularies(), a.default.forEach((m) => this.addVocabulary(m)), this.opts.discriminator && this.addKeyword(s.default);
    }
    _addDefaultMetaSchema() {
      if (super._addDefaultMetaSchema(), !this.opts.meta)
        return;
      const m = this.opts.$data ? this.$dataMetaSchema(i, r) : i;
      this.addMetaSchema(m, l, !1), this.refs["http://json-schema.org/schema"] = l;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(l) ? l : void 0);
    }
  }
  t.Ajv = c, e.exports = t = c, e.exports.Ajv = c, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = c;
  var o = De;
  Object.defineProperty(t, "KeywordCxt", { enumerable: !0, get: function() {
    return o.KeywordCxt;
  } });
  var u = B;
  Object.defineProperty(t, "_", { enumerable: !0, get: function() {
    return u._;
  } }), Object.defineProperty(t, "str", { enumerable: !0, get: function() {
    return u.str;
  } }), Object.defineProperty(t, "stringify", { enumerable: !0, get: function() {
    return u.stringify;
  } }), Object.defineProperty(t, "nil", { enumerable: !0, get: function() {
    return u.nil;
  } }), Object.defineProperty(t, "Name", { enumerable: !0, get: function() {
    return u.Name;
  } }), Object.defineProperty(t, "CodeGen", { enumerable: !0, get: function() {
    return u.CodeGen;
  } });
  var p = Xt;
  Object.defineProperty(t, "ValidationError", { enumerable: !0, get: function() {
    return p.default;
  } });
  var f = Nt;
  Object.defineProperty(t, "MissingRefError", { enumerable: !0, get: function() {
    return f.default;
  } });
})(Ws, Ws.exports);
var Z$ = Ws.exports;
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.formatLimitDefinition = void 0;
  const t = Z$, n = B, a = n.operators, s = {
    formatMaximum: { okStr: "<=", ok: a.LTE, fail: a.GT },
    formatMinimum: { okStr: ">=", ok: a.GTE, fail: a.LT },
    formatExclusiveMaximum: { okStr: "<", ok: a.LT, fail: a.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: a.GT, fail: a.LTE }
  }, i = {
    message: ({ keyword: l, schemaCode: c }) => (0, n.str)`should be ${s[l].okStr} ${c}`,
    params: ({ keyword: l, schemaCode: c }) => (0, n._)`{comparison: ${s[l].okStr}, limit: ${c}}`
  };
  e.formatLimitDefinition = {
    keyword: Object.keys(s),
    type: "string",
    schemaType: "string",
    $data: !0,
    error: i,
    code(l) {
      const { gen: c, data: o, schemaCode: u, keyword: p, it: f } = l, { opts: h, self: m } = f;
      if (!h.validateFormats)
        return;
      const y = new t.KeywordCxt(f, m.RULES.all.format.definition, "format");
      y.$data ? g() : v();
      function g() {
        const E = c.scopeValue("formats", {
          ref: m.formats,
          code: h.code.formats
        }), O = c.const("fmt", (0, n._)`${E}[${y.schemaCode}]`);
        l.fail$data((0, n.or)((0, n._)`typeof ${O} != "object"`, (0, n._)`${O} instanceof RegExp`, (0, n._)`typeof ${O}.compare != "function"`, $(O)));
      }
      function v() {
        const E = y.schema, O = m.formats[E];
        if (!O || O === !0)
          return;
        if (typeof O != "object" || O instanceof RegExp || typeof O.compare != "function")
          throw new Error(`"${p}": format "${E}" does not define "compare" function`);
        const P = c.scopeValue("formats", {
          key: E,
          ref: O,
          code: h.code.formats ? (0, n._)`${h.code.formats}${(0, n.getProperty)(E)}` : void 0
        });
        l.fail$data($(P));
      }
      function $(E) {
        return (0, n._)`${E}.compare(${o}, ${u}) ${s[p].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const r = (l) => (l.addKeyword(e.formatLimitDefinition), l);
  e.default = r;
})(hu);
(function(e, t) {
  Object.defineProperty(t, "__esModule", { value: !0 });
  const n = fu, a = hu, s = B, i = new s.Name("fullFormats"), r = new s.Name("fastFormats"), l = (o, u = { keywords: !0 }) => {
    if (Array.isArray(u))
      return c(o, u, n.fullFormats, i), o;
    const [p, f] = u.mode === "fast" ? [n.fastFormats, r] : [n.fullFormats, i], h = u.formats || n.formatNames;
    return c(o, h, p, f), u.keywords && (0, a.default)(o), o;
  };
  l.get = (o, u = "full") => {
    const f = (u === "fast" ? n.fastFormats : n.fullFormats)[o];
    if (!f)
      throw new Error(`Unknown format "${o}"`);
    return f;
  };
  function c(o, u, p, f) {
    var h, m;
    (h = (m = o.opts.code).formats) !== null && h !== void 0 || (m.formats = (0, s._)`require("ajv-formats/dist/formats").${f}`);
    for (const y of u)
      o.addFormat(y, p[y]);
  }
  e.exports = t = l, Object.defineProperty(t, "__esModule", { value: !0 }), t.default = l;
})(Ks, Ks.exports);
var Q$ = Ks.exports;
const e0 = /* @__PURE__ */ En(Q$), t0 = (e, t, n, a) => {
  if (n === "length" || n === "prototype" || n === "arguments" || n === "caller")
    return;
  const s = Object.getOwnPropertyDescriptor(e, n), i = Object.getOwnPropertyDescriptor(t, n);
  !n0(s, i) && a || Object.defineProperty(e, n, i);
}, n0 = function(e, t) {
  return e === void 0 || e.configurable || e.writable === t.writable && e.enumerable === t.enumerable && e.configurable === t.configurable && (e.writable || e.value === t.value);
}, a0 = (e, t) => {
  const n = Object.getPrototypeOf(t);
  n !== Object.getPrototypeOf(e) && Object.setPrototypeOf(e, n);
}, s0 = (e, t) => `/* Wrapped ${e}*/
${t}`, i0 = Object.getOwnPropertyDescriptor(Function.prototype, "toString"), r0 = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name"), o0 = (e, t, n) => {
  const a = n === "" ? "" : `with ${n.trim()}() `, s = s0.bind(null, a, t.toString());
  Object.defineProperty(s, "name", r0);
  const { writable: i, enumerable: r, configurable: l } = i0;
  Object.defineProperty(e, "toString", { value: s, writable: i, enumerable: r, configurable: l });
};
function c0(e, t, { ignoreNonConfigurable: n = !1 } = {}) {
  const { name: a } = e;
  for (const s of Reflect.ownKeys(t))
    t0(e, t, s, n);
  return a0(e, t), o0(e, t, a), e;
}
const Xo = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof e}\``);
  const {
    wait: n = 0,
    maxWait: a = Number.POSITIVE_INFINITY,
    before: s = !1,
    after: i = !0
  } = t;
  if (n < 0 || a < 0)
    throw new RangeError("`wait` and `maxWait` must not be negative.");
  if (!s && !i)
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  let r, l, c;
  const o = function(...u) {
    const p = this, f = () => {
      r = void 0, l && (clearTimeout(l), l = void 0), i && (c = e.apply(p, u));
    }, h = () => {
      l = void 0, r && (clearTimeout(r), r = void 0), i && (c = e.apply(p, u));
    }, m = s && !r;
    return clearTimeout(r), r = setTimeout(f, n), a > 0 && a !== Number.POSITIVE_INFINITY && !l && (l = setTimeout(h, a)), m && (c = e.apply(p, u)), c;
  };
  return c0(o, e), o.cancel = () => {
    r && (clearTimeout(r), r = void 0), l && (clearTimeout(l), l = void 0);
  }, o;
};
var Xs = { exports: {} };
const l0 = "2.0.0", vu = 256, u0 = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, p0 = 16, d0 = vu - 6, m0 = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ia = {
  MAX_LENGTH: vu,
  MAX_SAFE_COMPONENT_LENGTH: p0,
  MAX_SAFE_BUILD_LENGTH: d0,
  MAX_SAFE_INTEGER: u0,
  RELEASE_TYPES: m0,
  SEMVER_SPEC_VERSION: l0,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const f0 = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Ca = f0;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: a,
    MAX_LENGTH: s
  } = Ia, i = Ca;
  t = e.exports = {};
  const r = t.re = [], l = t.safeRe = [], c = t.src = [], o = t.t = {};
  let u = 0;
  const p = "[a-zA-Z0-9-]", f = [
    ["\\s", 1],
    ["\\d", s],
    [p, a]
  ], h = (y) => {
    for (const [g, v] of f)
      y = y.split(`${g}*`).join(`${g}{0,${v}}`).split(`${g}+`).join(`${g}{1,${v}}`);
    return y;
  }, m = (y, g, v) => {
    const $ = h(g), E = u++;
    i(y, E, g), o[y] = E, c[E] = g, r[E] = new RegExp(g, v ? "g" : void 0), l[E] = new RegExp($, v ? "g" : void 0);
  };
  m("NUMERICIDENTIFIER", "0|[1-9]\\d*"), m("NUMERICIDENTIFIERLOOSE", "\\d+"), m("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), m("MAINVERSION", `(${c[o.NUMERICIDENTIFIER]})\\.(${c[o.NUMERICIDENTIFIER]})\\.(${c[o.NUMERICIDENTIFIER]})`), m("MAINVERSIONLOOSE", `(${c[o.NUMERICIDENTIFIERLOOSE]})\\.(${c[o.NUMERICIDENTIFIERLOOSE]})\\.(${c[o.NUMERICIDENTIFIERLOOSE]})`), m("PRERELEASEIDENTIFIER", `(?:${c[o.NUMERICIDENTIFIER]}|${c[o.NONNUMERICIDENTIFIER]})`), m("PRERELEASEIDENTIFIERLOOSE", `(?:${c[o.NUMERICIDENTIFIERLOOSE]}|${c[o.NONNUMERICIDENTIFIER]})`), m("PRERELEASE", `(?:-(${c[o.PRERELEASEIDENTIFIER]}(?:\\.${c[o.PRERELEASEIDENTIFIER]})*))`), m("PRERELEASELOOSE", `(?:-?(${c[o.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[o.PRERELEASEIDENTIFIERLOOSE]})*))`), m("BUILDIDENTIFIER", `${p}+`), m("BUILD", `(?:\\+(${c[o.BUILDIDENTIFIER]}(?:\\.${c[o.BUILDIDENTIFIER]})*))`), m("FULLPLAIN", `v?${c[o.MAINVERSION]}${c[o.PRERELEASE]}?${c[o.BUILD]}?`), m("FULL", `^${c[o.FULLPLAIN]}$`), m("LOOSEPLAIN", `[v=\\s]*${c[o.MAINVERSIONLOOSE]}${c[o.PRERELEASELOOSE]}?${c[o.BUILD]}?`), m("LOOSE", `^${c[o.LOOSEPLAIN]}$`), m("GTLT", "((?:<|>)?=?)"), m("XRANGEIDENTIFIERLOOSE", `${c[o.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), m("XRANGEIDENTIFIER", `${c[o.NUMERICIDENTIFIER]}|x|X|\\*`), m("XRANGEPLAIN", `[v=\\s]*(${c[o.XRANGEIDENTIFIER]})(?:\\.(${c[o.XRANGEIDENTIFIER]})(?:\\.(${c[o.XRANGEIDENTIFIER]})(?:${c[o.PRERELEASE]})?${c[o.BUILD]}?)?)?`), m("XRANGEPLAINLOOSE", `[v=\\s]*(${c[o.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[o.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[o.XRANGEIDENTIFIERLOOSE]})(?:${c[o.PRERELEASELOOSE]})?${c[o.BUILD]}?)?)?`), m("XRANGE", `^${c[o.GTLT]}\\s*${c[o.XRANGEPLAIN]}$`), m("XRANGELOOSE", `^${c[o.GTLT]}\\s*${c[o.XRANGEPLAINLOOSE]}$`), m("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), m("COERCE", `${c[o.COERCEPLAIN]}(?:$|[^\\d])`), m("COERCEFULL", c[o.COERCEPLAIN] + `(?:${c[o.PRERELEASE]})?(?:${c[o.BUILD]})?(?:$|[^\\d])`), m("COERCERTL", c[o.COERCE], !0), m("COERCERTLFULL", c[o.COERCEFULL], !0), m("LONETILDE", "(?:~>?)"), m("TILDETRIM", `(\\s*)${c[o.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", m("TILDE", `^${c[o.LONETILDE]}${c[o.XRANGEPLAIN]}$`), m("TILDELOOSE", `^${c[o.LONETILDE]}${c[o.XRANGEPLAINLOOSE]}$`), m("LONECARET", "(?:\\^)"), m("CARETTRIM", `(\\s*)${c[o.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", m("CARET", `^${c[o.LONECARET]}${c[o.XRANGEPLAIN]}$`), m("CARETLOOSE", `^${c[o.LONECARET]}${c[o.XRANGEPLAINLOOSE]}$`), m("COMPARATORLOOSE", `^${c[o.GTLT]}\\s*(${c[o.LOOSEPLAIN]})$|^$`), m("COMPARATOR", `^${c[o.GTLT]}\\s*(${c[o.FULLPLAIN]})$|^$`), m("COMPARATORTRIM", `(\\s*)${c[o.GTLT]}\\s*(${c[o.LOOSEPLAIN]}|${c[o.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", m("HYPHENRANGE", `^\\s*(${c[o.XRANGEPLAIN]})\\s+-\\s+(${c[o.XRANGEPLAIN]})\\s*$`), m("HYPHENRANGELOOSE", `^\\s*(${c[o.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[o.XRANGEPLAINLOOSE]})\\s*$`), m("STAR", "(<|>)?=?\\s*\\*"), m("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), m("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Xs, Xs.exports);
var Nn = Xs.exports;
const h0 = Object.freeze({ loose: !0 }), v0 = Object.freeze({}), g0 = (e) => e ? typeof e != "object" ? h0 : e : v0;
var wr = g0;
const Jo = /^[0-9]+$/, gu = (e, t) => {
  const n = Jo.test(e), a = Jo.test(t);
  return n && a && (e = +e, t = +t), e === t ? 0 : n && !a ? -1 : a && !n ? 1 : e < t ? -1 : 1;
}, x0 = (e, t) => gu(t, e);
var xu = {
  compareIdentifiers: gu,
  rcompareIdentifiers: x0
};
const Mn = Ca, { MAX_LENGTH: Yo, MAX_SAFE_INTEGER: Vn } = Ia, { safeRe: Zo, t: Qo } = Nn, y0 = wr, { compareIdentifiers: Lt } = xu;
let b0 = class He {
  constructor(t, n) {
    if (n = y0(n), t instanceof He) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Yo)
      throw new TypeError(
        `version is longer than ${Yo} characters`
      );
    Mn("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const a = t.trim().match(n.loose ? Zo[Qo.LOOSE] : Zo[Qo.FULL]);
    if (!a)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +a[1], this.minor = +a[2], this.patch = +a[3], this.major > Vn || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Vn || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Vn || this.patch < 0)
      throw new TypeError("Invalid patch version");
    a[4] ? this.prerelease = a[4].split(".").map((s) => {
      if (/^[0-9]+$/.test(s)) {
        const i = +s;
        if (i >= 0 && i < Vn)
          return i;
      }
      return s;
    }) : this.prerelease = [], this.build = a[5] ? a[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Mn("SemVer.compare", this.version, this.options, t), !(t instanceof He)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new He(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof He || (t = new He(t, this.options)), Lt(this.major, t.major) || Lt(this.minor, t.minor) || Lt(this.patch, t.patch);
  }
  comparePre(t) {
    if (t instanceof He || (t = new He(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const a = this.prerelease[n], s = t.prerelease[n];
      if (Mn("prerelease compare", n, a, s), a === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (a === void 0)
        return -1;
      if (a === s)
        continue;
      return Lt(a, s);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof He || (t = new He(t, this.options));
    let n = 0;
    do {
      const a = this.build[n], s = t.build[n];
      if (Mn("build compare", n, a, s), a === void 0 && s === void 0)
        return 0;
      if (s === void 0)
        return 1;
      if (a === void 0)
        return -1;
      if (a === s)
        continue;
      return Lt(a, s);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, a) {
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, a);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, a);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, a), this.inc("pre", n, a);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, a), this.inc("pre", n, a);
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const s = Number(a) ? 1 : 0;
        if (!n && a === !1)
          throw new Error("invalid increment argument: identifier is empty");
        if (this.prerelease.length === 0)
          this.prerelease = [s];
        else {
          let i = this.prerelease.length;
          for (; --i >= 0; )
            typeof this.prerelease[i] == "number" && (this.prerelease[i]++, i = -2);
          if (i === -1) {
            if (n === this.prerelease.join(".") && a === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(s);
          }
        }
        if (n) {
          let i = [n, s];
          a === !1 && (i = [n]), Lt(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = i) : this.prerelease = i;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var ke = b0;
const ec = ke, $0 = (e, t, n = !1) => {
  if (e instanceof ec)
    return e;
  try {
    return new ec(e, t);
  } catch (a) {
    if (!n)
      return null;
    throw a;
  }
};
var en = $0;
const w0 = en, _0 = (e, t) => {
  const n = w0(e, t);
  return n ? n.version : null;
};
var E0 = _0;
const S0 = en, R0 = (e, t) => {
  const n = S0(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var k0 = R0;
const tc = ke, j0 = (e, t, n, a, s) => {
  typeof n == "string" && (s = a, a = n, n = void 0);
  try {
    return new tc(
      e instanceof tc ? e.version : e,
      n
    ).inc(t, a, s).version;
  } catch {
    return null;
  }
};
var T0 = j0;
const nc = en, O0 = (e, t) => {
  const n = nc(e, null, !0), a = nc(t, null, !0), s = n.compare(a);
  if (s === 0)
    return null;
  const i = s > 0, r = i ? n : a, l = i ? a : n, c = !!r.prerelease.length;
  if (!!l.prerelease.length && !c)
    return !l.patch && !l.minor ? "major" : r.patch ? "patch" : r.minor ? "minor" : "major";
  const u = c ? "pre" : "";
  return n.major !== a.major ? u + "major" : n.minor !== a.minor ? u + "minor" : n.patch !== a.patch ? u + "patch" : "prerelease";
};
var P0 = O0;
const N0 = ke, A0 = (e, t) => new N0(e, t).major;
var I0 = A0;
const C0 = ke, L0 = (e, t) => new C0(e, t).minor;
var D0 = L0;
const F0 = ke, z0 = (e, t) => new F0(e, t).patch;
var U0 = z0;
const q0 = en, M0 = (e, t) => {
  const n = q0(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var V0 = M0;
const ac = ke, B0 = (e, t, n) => new ac(e, n).compare(new ac(t, n));
var Ve = B0;
const H0 = Ve, G0 = (e, t, n) => H0(t, e, n);
var K0 = G0;
const W0 = Ve, X0 = (e, t) => W0(e, t, !0);
var J0 = X0;
const sc = ke, Y0 = (e, t, n) => {
  const a = new sc(e, n), s = new sc(t, n);
  return a.compare(s) || a.compareBuild(s);
};
var _r = Y0;
const Z0 = _r, Q0 = (e, t) => e.sort((n, a) => Z0(n, a, t));
var ew = Q0;
const tw = _r, nw = (e, t) => e.sort((n, a) => tw(a, n, t));
var aw = nw;
const sw = Ve, iw = (e, t, n) => sw(e, t, n) > 0;
var La = iw;
const rw = Ve, ow = (e, t, n) => rw(e, t, n) < 0;
var Er = ow;
const cw = Ve, lw = (e, t, n) => cw(e, t, n) === 0;
var yu = lw;
const uw = Ve, pw = (e, t, n) => uw(e, t, n) !== 0;
var bu = pw;
const dw = Ve, mw = (e, t, n) => dw(e, t, n) >= 0;
var Sr = mw;
const fw = Ve, hw = (e, t, n) => fw(e, t, n) <= 0;
var Rr = hw;
const vw = yu, gw = bu, xw = La, yw = Sr, bw = Er, $w = Rr, ww = (e, t, n, a) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return vw(e, n, a);
    case "!=":
      return gw(e, n, a);
    case ">":
      return xw(e, n, a);
    case ">=":
      return yw(e, n, a);
    case "<":
      return bw(e, n, a);
    case "<=":
      return $w(e, n, a);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var $u = ww;
const _w = ke, Ew = en, { safeRe: Bn, t: Hn } = Nn, Sw = (e, t) => {
  if (e instanceof _w)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? Bn[Hn.COERCEFULL] : Bn[Hn.COERCE]);
  else {
    const c = t.includePrerelease ? Bn[Hn.COERCERTLFULL] : Bn[Hn.COERCERTL];
    let o;
    for (; (o = c.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || o.index + o[0].length !== n.index + n[0].length) && (n = o), c.lastIndex = o.index + o[1].length + o[2].length;
    c.lastIndex = -1;
  }
  if (n === null)
    return null;
  const a = n[2], s = n[3] || "0", i = n[4] || "0", r = t.includePrerelease && n[5] ? `-${n[5]}` : "", l = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return Ew(`${a}.${s}.${i}${r}${l}`, t);
};
var Rw = Sw;
class kw {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const s = this.map.keys().next().value;
        this.delete(s);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var jw = kw, ys, ic;
function Be() {
  if (ic) return ys;
  ic = 1;
  const e = /\s+/g;
  class t {
    constructor(N, F) {
      if (F = s(F), N instanceof t)
        return N.loose === !!F.loose && N.includePrerelease === !!F.includePrerelease ? N : new t(N.raw, F);
      if (N instanceof i)
        return this.raw = N.value, this.set = [[N]], this.formatted = void 0, this;
      if (this.options = F, this.loose = !!F.loose, this.includePrerelease = !!F.includePrerelease, this.raw = N.trim().replace(e, " "), this.set = this.raw.split("||").map((T) => this.parseRange(T.trim())).filter((T) => T.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const T = this.set[0];
        if (this.set = this.set.filter((A) => !y(A[0])), this.set.length === 0)
          this.set = [T];
        else if (this.set.length > 1) {
          for (const A of this.set)
            if (A.length === 1 && g(A[0])) {
              this.set = [A];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let N = 0; N < this.set.length; N++) {
          N > 0 && (this.formatted += "||");
          const F = this.set[N];
          for (let T = 0; T < F.length; T++)
            T > 0 && (this.formatted += " "), this.formatted += F[T].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(N) {
      const T = ((this.options.includePrerelease && h) | (this.options.loose && m)) + ":" + N, A = a.get(T);
      if (A)
        return A;
      const I = this.options.loose, R = I ? c[o.HYPHENRANGELOOSE] : c[o.HYPHENRANGE];
      N = N.replace(R, M(this.options.includePrerelease)), r("hyphen replace", N), N = N.replace(c[o.COMPARATORTRIM], u), r("comparator trim", N), N = N.replace(c[o.TILDETRIM], p), r("tilde trim", N), N = N.replace(c[o.CARETTRIM], f), r("caret trim", N);
      let b = N.split(" ").map((x) => $(x, this.options)).join(" ").split(/\s+/).map((x) => q(x, this.options));
      I && (b = b.filter((x) => (r("loose invalid filter", x, this.options), !!x.match(c[o.COMPARATORLOOSE])))), r("range list", b);
      const S = /* @__PURE__ */ new Map(), w = b.map((x) => new i(x, this.options));
      for (const x of w) {
        if (y(x))
          return [x];
        S.set(x.value, x);
      }
      S.size > 1 && S.has("") && S.delete("");
      const d = [...S.values()];
      return a.set(T, d), d;
    }
    intersects(N, F) {
      if (!(N instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((T) => v(T, F) && N.set.some((A) => v(A, F) && T.every((I) => A.every((R) => I.intersects(R, F)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(N) {
      if (!N)
        return !1;
      if (typeof N == "string")
        try {
          N = new l(N, this.options);
        } catch {
          return !1;
        }
      for (let F = 0; F < this.set.length; F++)
        if (te(this.set[F], N, this.options))
          return !0;
      return !1;
    }
  }
  ys = t;
  const n = jw, a = new n(), s = wr, i = Da(), r = Ca, l = ke, {
    safeRe: c,
    t: o,
    comparatorTrimReplace: u,
    tildeTrimReplace: p,
    caretTrimReplace: f
  } = Nn, { FLAG_INCLUDE_PRERELEASE: h, FLAG_LOOSE: m } = Ia, y = (j) => j.value === "<0.0.0-0", g = (j) => j.value === "", v = (j, N) => {
    let F = !0;
    const T = j.slice();
    let A = T.pop();
    for (; F && T.length; )
      F = T.every((I) => A.intersects(I, N)), A = T.pop();
    return F;
  }, $ = (j, N) => (r("comp", j, N), j = H(j, N), r("caret", j), j = O(j, N), r("tildes", j), j = se(j, N), r("xrange", j), j = he(j, N), r("stars", j), j), E = (j) => !j || j.toLowerCase() === "x" || j === "*", O = (j, N) => j.trim().split(/\s+/).map((F) => P(F, N)).join(" "), P = (j, N) => {
    const F = N.loose ? c[o.TILDELOOSE] : c[o.TILDE];
    return j.replace(F, (T, A, I, R, b) => {
      r("tilde", j, T, A, I, R, b);
      let S;
      return E(A) ? S = "" : E(I) ? S = `>=${A}.0.0 <${+A + 1}.0.0-0` : E(R) ? S = `>=${A}.${I}.0 <${A}.${+I + 1}.0-0` : b ? (r("replaceTilde pr", b), S = `>=${A}.${I}.${R}-${b} <${A}.${+I + 1}.0-0`) : S = `>=${A}.${I}.${R} <${A}.${+I + 1}.0-0`, r("tilde return", S), S;
    });
  }, H = (j, N) => j.trim().split(/\s+/).map((F) => W(F, N)).join(" "), W = (j, N) => {
    r("caret", j, N);
    const F = N.loose ? c[o.CARETLOOSE] : c[o.CARET], T = N.includePrerelease ? "-0" : "";
    return j.replace(F, (A, I, R, b, S) => {
      r("caret", j, A, I, R, b, S);
      let w;
      return E(I) ? w = "" : E(R) ? w = `>=${I}.0.0${T} <${+I + 1}.0.0-0` : E(b) ? I === "0" ? w = `>=${I}.${R}.0${T} <${I}.${+R + 1}.0-0` : w = `>=${I}.${R}.0${T} <${+I + 1}.0.0-0` : S ? (r("replaceCaret pr", S), I === "0" ? R === "0" ? w = `>=${I}.${R}.${b}-${S} <${I}.${R}.${+b + 1}-0` : w = `>=${I}.${R}.${b}-${S} <${I}.${+R + 1}.0-0` : w = `>=${I}.${R}.${b}-${S} <${+I + 1}.0.0-0`) : (r("no pr"), I === "0" ? R === "0" ? w = `>=${I}.${R}.${b}${T} <${I}.${R}.${+b + 1}-0` : w = `>=${I}.${R}.${b}${T} <${I}.${+R + 1}.0-0` : w = `>=${I}.${R}.${b} <${+I + 1}.0.0-0`), r("caret return", w), w;
    });
  }, se = (j, N) => (r("replaceXRanges", j, N), j.split(/\s+/).map((F) => ce(F, N)).join(" ")), ce = (j, N) => {
    j = j.trim();
    const F = N.loose ? c[o.XRANGELOOSE] : c[o.XRANGE];
    return j.replace(F, (T, A, I, R, b, S) => {
      r("xRange", j, T, A, I, R, b, S);
      const w = E(I), d = w || E(R), x = d || E(b), k = x;
      return A === "=" && k && (A = ""), S = N.includePrerelease ? "-0" : "", w ? A === ">" || A === "<" ? T = "<0.0.0-0" : T = "*" : A && k ? (d && (R = 0), b = 0, A === ">" ? (A = ">=", d ? (I = +I + 1, R = 0, b = 0) : (R = +R + 1, b = 0)) : A === "<=" && (A = "<", d ? I = +I + 1 : R = +R + 1), A === "<" && (S = "-0"), T = `${A + I}.${R}.${b}${S}`) : d ? T = `>=${I}.0.0${S} <${+I + 1}.0.0-0` : x && (T = `>=${I}.${R}.0${S} <${I}.${+R + 1}.0-0`), r("xRange return", T), T;
    });
  }, he = (j, N) => (r("replaceStars", j, N), j.trim().replace(c[o.STAR], "")), q = (j, N) => (r("replaceGTE0", j, N), j.trim().replace(c[N.includePrerelease ? o.GTE0PRE : o.GTE0], "")), M = (j) => (N, F, T, A, I, R, b, S, w, d, x, k) => (E(T) ? F = "" : E(A) ? F = `>=${T}.0.0${j ? "-0" : ""}` : E(I) ? F = `>=${T}.${A}.0${j ? "-0" : ""}` : R ? F = `>=${F}` : F = `>=${F}${j ? "-0" : ""}`, E(w) ? S = "" : E(d) ? S = `<${+w + 1}.0.0-0` : E(x) ? S = `<${w}.${+d + 1}.0-0` : k ? S = `<=${w}.${d}.${x}-${k}` : j ? S = `<${w}.${d}.${+x + 1}-0` : S = `<=${S}`, `${F} ${S}`.trim()), te = (j, N, F) => {
    for (let T = 0; T < j.length; T++)
      if (!j[T].test(N))
        return !1;
    if (N.prerelease.length && !F.includePrerelease) {
      for (let T = 0; T < j.length; T++)
        if (r(j[T].semver), j[T].semver !== i.ANY && j[T].semver.prerelease.length > 0) {
          const A = j[T].semver;
          if (A.major === N.major && A.minor === N.minor && A.patch === N.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ys;
}
var bs, rc;
function Da() {
  if (rc) return bs;
  rc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(u, p) {
      if (p = n(p), u instanceof t) {
        if (u.loose === !!p.loose)
          return u;
        u = u.value;
      }
      u = u.trim().split(/\s+/).join(" "), r("comparator", u, p), this.options = p, this.loose = !!p.loose, this.parse(u), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, r("comp", this);
    }
    parse(u) {
      const p = this.options.loose ? a[s.COMPARATORLOOSE] : a[s.COMPARATOR], f = u.match(p);
      if (!f)
        throw new TypeError(`Invalid comparator: ${u}`);
      this.operator = f[1] !== void 0 ? f[1] : "", this.operator === "=" && (this.operator = ""), f[2] ? this.semver = new l(f[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(u) {
      if (r("Comparator.test", u, this.options.loose), this.semver === e || u === e)
        return !0;
      if (typeof u == "string")
        try {
          u = new l(u, this.options);
        } catch {
          return !1;
        }
      return i(u, this.operator, this.semver, this.options);
    }
    intersects(u, p) {
      if (!(u instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(u.value, p).test(this.value) : u.operator === "" ? u.value === "" ? !0 : new c(this.value, p).test(u.semver) : (p = n(p), p.includePrerelease && (this.value === "<0.0.0-0" || u.value === "<0.0.0-0") || !p.includePrerelease && (this.value.startsWith("<0.0.0") || u.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && u.operator.startsWith(">") || this.operator.startsWith("<") && u.operator.startsWith("<") || this.semver.version === u.semver.version && this.operator.includes("=") && u.operator.includes("=") || i(this.semver, "<", u.semver, p) && this.operator.startsWith(">") && u.operator.startsWith("<") || i(this.semver, ">", u.semver, p) && this.operator.startsWith("<") && u.operator.startsWith(">")));
    }
  }
  bs = t;
  const n = wr, { safeRe: a, t: s } = Nn, i = $u, r = Ca, l = ke, c = Be();
  return bs;
}
const Tw = Be(), Ow = (e, t, n) => {
  try {
    t = new Tw(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Fa = Ow;
const Pw = Be(), Nw = (e, t) => new Pw(e, t).set.map((n) => n.map((a) => a.value).join(" ").trim().split(" "));
var Aw = Nw;
const Iw = ke, Cw = Be(), Lw = (e, t, n) => {
  let a = null, s = null, i = null;
  try {
    i = new Cw(t, n);
  } catch {
    return null;
  }
  return e.forEach((r) => {
    i.test(r) && (!a || s.compare(r) === -1) && (a = r, s = new Iw(a, n));
  }), a;
};
var Dw = Lw;
const Fw = ke, zw = Be(), Uw = (e, t, n) => {
  let a = null, s = null, i = null;
  try {
    i = new zw(t, n);
  } catch {
    return null;
  }
  return e.forEach((r) => {
    i.test(r) && (!a || s.compare(r) === 1) && (a = r, s = new Fw(a, n));
  }), a;
};
var qw = Uw;
const $s = ke, Mw = Be(), oc = La, Vw = (e, t) => {
  e = new Mw(e, t);
  let n = new $s("0.0.0");
  if (e.test(n) || (n = new $s("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let a = 0; a < e.set.length; ++a) {
    const s = e.set[a];
    let i = null;
    s.forEach((r) => {
      const l = new $s(r.semver.version);
      switch (r.operator) {
        case ">":
          l.prerelease.length === 0 ? l.patch++ : l.prerelease.push(0), l.raw = l.format();
        case "":
        case ">=":
          (!i || oc(l, i)) && (i = l);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${r.operator}`);
      }
    }), i && (!n || oc(n, i)) && (n = i);
  }
  return n && e.test(n) ? n : null;
};
var Bw = Vw;
const Hw = Be(), Gw = (e, t) => {
  try {
    return new Hw(e, t).range || "*";
  } catch {
    return null;
  }
};
var Kw = Gw;
const Ww = ke, wu = Da(), { ANY: Xw } = wu, Jw = Be(), Yw = Fa, cc = La, lc = Er, Zw = Rr, Qw = Sr, e_ = (e, t, n, a) => {
  e = new Ww(e, a), t = new Jw(t, a);
  let s, i, r, l, c;
  switch (n) {
    case ">":
      s = cc, i = Zw, r = lc, l = ">", c = ">=";
      break;
    case "<":
      s = lc, i = Qw, r = cc, l = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Yw(e, t, a))
    return !1;
  for (let o = 0; o < t.set.length; ++o) {
    const u = t.set[o];
    let p = null, f = null;
    if (u.forEach((h) => {
      h.semver === Xw && (h = new wu(">=0.0.0")), p = p || h, f = f || h, s(h.semver, p.semver, a) ? p = h : r(h.semver, f.semver, a) && (f = h);
    }), p.operator === l || p.operator === c || (!f.operator || f.operator === l) && i(e, f.semver))
      return !1;
    if (f.operator === c && r(e, f.semver))
      return !1;
  }
  return !0;
};
var kr = e_;
const t_ = kr, n_ = (e, t, n) => t_(e, t, ">", n);
var a_ = n_;
const s_ = kr, i_ = (e, t, n) => s_(e, t, "<", n);
var r_ = i_;
const uc = Be(), o_ = (e, t, n) => (e = new uc(e, n), t = new uc(t, n), e.intersects(t, n));
var c_ = o_;
const l_ = Fa, u_ = Ve;
var p_ = (e, t, n) => {
  const a = [];
  let s = null, i = null;
  const r = e.sort((u, p) => u_(u, p, n));
  for (const u of r)
    l_(u, t, n) ? (i = u, s || (s = u)) : (i && a.push([s, i]), i = null, s = null);
  s && a.push([s, null]);
  const l = [];
  for (const [u, p] of a)
    u === p ? l.push(u) : !p && u === r[0] ? l.push("*") : p ? u === r[0] ? l.push(`<=${p}`) : l.push(`${u} - ${p}`) : l.push(`>=${u}`);
  const c = l.join(" || "), o = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < o.length ? c : t;
};
const pc = Be(), jr = Da(), { ANY: ws } = jr, pn = Fa, Tr = Ve, d_ = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new pc(e, n), t = new pc(t, n);
  let a = !1;
  e: for (const s of e.set) {
    for (const i of t.set) {
      const r = f_(s, i, n);
      if (a = a || r !== null, r)
        continue e;
    }
    if (a)
      return !1;
  }
  return !0;
}, m_ = [new jr(">=0.0.0-0")], dc = [new jr(">=0.0.0")], f_ = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ws) {
    if (t.length === 1 && t[0].semver === ws)
      return !0;
    n.includePrerelease ? e = m_ : e = dc;
  }
  if (t.length === 1 && t[0].semver === ws) {
    if (n.includePrerelease)
      return !0;
    t = dc;
  }
  const a = /* @__PURE__ */ new Set();
  let s, i;
  for (const h of e)
    h.operator === ">" || h.operator === ">=" ? s = mc(s, h, n) : h.operator === "<" || h.operator === "<=" ? i = fc(i, h, n) : a.add(h.semver);
  if (a.size > 1)
    return null;
  let r;
  if (s && i) {
    if (r = Tr(s.semver, i.semver, n), r > 0)
      return null;
    if (r === 0 && (s.operator !== ">=" || i.operator !== "<="))
      return null;
  }
  for (const h of a) {
    if (s && !pn(h, String(s), n) || i && !pn(h, String(i), n))
      return null;
    for (const m of t)
      if (!pn(h, String(m), n))
        return !1;
    return !0;
  }
  let l, c, o, u, p = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1, f = s && !n.includePrerelease && s.semver.prerelease.length ? s.semver : !1;
  p && p.prerelease.length === 1 && i.operator === "<" && p.prerelease[0] === 0 && (p = !1);
  for (const h of t) {
    if (u = u || h.operator === ">" || h.operator === ">=", o = o || h.operator === "<" || h.operator === "<=", s) {
      if (f && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === f.major && h.semver.minor === f.minor && h.semver.patch === f.patch && (f = !1), h.operator === ">" || h.operator === ">=") {
        if (l = mc(s, h, n), l === h && l !== s)
          return !1;
      } else if (s.operator === ">=" && !pn(s.semver, String(h), n))
        return !1;
    }
    if (i) {
      if (p && h.semver.prerelease && h.semver.prerelease.length && h.semver.major === p.major && h.semver.minor === p.minor && h.semver.patch === p.patch && (p = !1), h.operator === "<" || h.operator === "<=") {
        if (c = fc(i, h, n), c === h && c !== i)
          return !1;
      } else if (i.operator === "<=" && !pn(i.semver, String(h), n))
        return !1;
    }
    if (!h.operator && (i || s) && r !== 0)
      return !1;
  }
  return !(s && o && !i && r !== 0 || i && u && !s && r !== 0 || f || p);
}, mc = (e, t, n) => {
  if (!e)
    return t;
  const a = Tr(e.semver, t.semver, n);
  return a > 0 ? e : a < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, fc = (e, t, n) => {
  if (!e)
    return t;
  const a = Tr(e.semver, t.semver, n);
  return a < 0 ? e : a > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var h_ = d_;
const _s = Nn, hc = Ia, v_ = ke, vc = xu, g_ = en, x_ = E0, y_ = k0, b_ = T0, $_ = P0, w_ = I0, __ = D0, E_ = U0, S_ = V0, R_ = Ve, k_ = K0, j_ = J0, T_ = _r, O_ = ew, P_ = aw, N_ = La, A_ = Er, I_ = yu, C_ = bu, L_ = Sr, D_ = Rr, F_ = $u, z_ = Rw, U_ = Da(), q_ = Be(), M_ = Fa, V_ = Aw, B_ = Dw, H_ = qw, G_ = Bw, K_ = Kw, W_ = kr, X_ = a_, J_ = r_, Y_ = c_, Z_ = p_, Q_ = h_;
var eE = {
  parse: g_,
  valid: x_,
  clean: y_,
  inc: b_,
  diff: $_,
  major: w_,
  minor: __,
  patch: E_,
  prerelease: S_,
  compare: R_,
  rcompare: k_,
  compareLoose: j_,
  compareBuild: T_,
  sort: O_,
  rsort: P_,
  gt: N_,
  lt: A_,
  eq: I_,
  neq: C_,
  gte: L_,
  lte: D_,
  cmp: F_,
  coerce: z_,
  Comparator: U_,
  Range: q_,
  satisfies: M_,
  toComparators: V_,
  maxSatisfying: B_,
  minSatisfying: H_,
  minVersion: G_,
  validRange: K_,
  outside: W_,
  gtr: X_,
  ltr: J_,
  intersects: Y_,
  simplifyRange: Z_,
  subset: Q_,
  SemVer: v_,
  re: _s.re,
  src: _s.src,
  tokens: _s.t,
  SEMVER_SPEC_VERSION: hc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: hc.RELEASE_TYPES,
  compareIdentifiers: vc.compareIdentifiers,
  rcompareIdentifiers: vc.rcompareIdentifiers
};
const Dt = /* @__PURE__ */ En(eE), tE = Object.prototype.toString, nE = "[object Uint8Array]", aE = "[object ArrayBuffer]";
function _u(e, t, n) {
  return e ? e.constructor === t ? !0 : tE.call(e) === n : !1;
}
function Eu(e) {
  return _u(e, Uint8Array, nE);
}
function sE(e) {
  return _u(e, ArrayBuffer, aE);
}
function iE(e) {
  return Eu(e) || sE(e);
}
function rE(e) {
  if (!Eu(e))
    throw new TypeError(`Expected \`Uint8Array\`, got \`${typeof e}\``);
}
function oE(e) {
  if (!iE(e))
    throw new TypeError(`Expected \`Uint8Array\` or \`ArrayBuffer\`, got \`${typeof e}\``);
}
function gc(e, t) {
  if (e.length === 0)
    return new Uint8Array(0);
  t ?? (t = e.reduce((s, i) => s + i.length, 0));
  const n = new Uint8Array(t);
  let a = 0;
  for (const s of e)
    rE(s), n.set(s, a), a += s.length;
  return n;
}
const Gn = {
  utf8: new globalThis.TextDecoder("utf8")
};
function xc(e, t = "utf8") {
  return oE(e), Gn[t] ?? (Gn[t] = new globalThis.TextDecoder(t)), Gn[t].decode(e);
}
function cE(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected \`string\`, got \`${typeof e}\``);
}
const lE = new globalThis.TextEncoder();
function Es(e) {
  return cE(e), lE.encode(e);
}
Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
const uE = e0.default, yc = "aes-256-cbc", Ft = () => /* @__PURE__ */ Object.create(null), pE = (e) => e != null, dE = (e, t) => {
  const n = /* @__PURE__ */ new Set([
    "undefined",
    "symbol",
    "function"
  ]), a = typeof t;
  if (n.has(a))
    throw new TypeError(`Setting a value of type \`${a}\` for key \`${e}\` is not allowed as it's not supported by JSON`);
}, ea = "__internal__", Ss = `${ea}.migrations.version`;
var mt, Ze, Ne, Qe;
class mE {
  constructor(t = {}) {
    nn(this, "path");
    nn(this, "events");
    an(this, mt);
    an(this, Ze);
    an(this, Ne);
    an(this, Qe, {});
    nn(this, "_deserialize", (t) => JSON.parse(t));
    nn(this, "_serialize", (t) => JSON.stringify(t, void 0, "	"));
    const n = {
      configName: "config",
      fileExtension: "json",
      projectSuffix: "nodejs",
      clearInvalidConfig: !1,
      accessPropertiesByDotNotation: !0,
      configFileMode: 438,
      ...t
    };
    if (!n.cwd) {
      if (!n.projectName)
        throw new Error("Please specify the `projectName` option.");
      n.cwd = Af(n.projectName, { suffix: n.projectSuffix }).config;
    }
    if (sn(this, Ne, n), n.schema) {
      if (typeof n.schema != "object")
        throw new TypeError("The `schema` option must be an object.");
      const r = new z$.Ajv2020({
        allErrors: !0,
        useDefaults: !0
      });
      uE(r);
      const l = {
        type: "object",
        properties: n.schema
      };
      sn(this, mt, r.compile(l));
      for (const [c, o] of Object.entries(n.schema))
        o != null && o.default && (re(this, Qe)[c] = o.default);
    }
    n.defaults && sn(this, Qe, {
      ...re(this, Qe),
      ...n.defaults
    }), n.serialize && (this._serialize = n.serialize), n.deserialize && (this._deserialize = n.deserialize), this.events = new EventTarget(), sn(this, Ze, n.encryptionKey);
    const a = n.fileExtension ? `.${n.fileExtension}` : "";
    this.path = J.resolve(n.cwd, `${n.configName ?? "config"}${a}`);
    const s = this.store, i = Object.assign(Ft(), n.defaults, s);
    if (n.migrations) {
      if (!n.projectVersion)
        throw new Error("Please specify the `projectVersion` option.");
      this._migrate(n.migrations, n.projectVersion, n.beforeEachMigration);
    }
    this._validate(i);
    try {
      Hu.deepEqual(s, i);
    } catch {
      this.store = i;
    }
    n.watch && this._watch();
  }
  get(t, n) {
    if (re(this, Ne).accessPropertiesByDotNotation)
      return this._get(t, n);
    const { store: a } = this;
    return t in a ? a[t] : n;
  }
  set(t, n) {
    if (typeof t != "string" && typeof t != "object")
      throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof t}`);
    if (typeof t != "object" && n === void 0)
      throw new TypeError("Use `delete()` to clear values");
    if (this._containsReservedKey(t))
      throw new TypeError(`Please don't use the ${ea} key, as it's used to manage this module internal operations.`);
    const { store: a } = this, s = (i, r) => {
      dE(i, r), re(this, Ne).accessPropertiesByDotNotation ? mo(a, i, r) : a[i] = r;
    };
    if (typeof t == "object") {
      const i = t;
      for (const [r, l] of Object.entries(i))
        s(r, l);
    } else
      s(t, n);
    this.store = a;
  }
  /**
      Check if an item exists.
  
      @param key - The key of the item to check.
      */
  has(t) {
    return re(this, Ne).accessPropertiesByDotNotation ? Tf(this.store, t) : t in this.store;
  }
  /**
      Reset items to their default values, as defined by the `defaults` or `schema` option.
  
      @see `clear()` to reset all items.
  
      @param keys - The keys of the items to reset.
      */
  reset(...t) {
    for (const n of t)
      pE(re(this, Qe)[n]) && this.set(n, re(this, Qe)[n]);
  }
  delete(t) {
    const { store: n } = this;
    re(this, Ne).accessPropertiesByDotNotation ? jf(n, t) : delete n[t], this.store = n;
  }
  /**
      Delete all items.
  
      This resets known items to their default values, if defined by the `defaults` or `schema` option.
      */
  clear() {
    this.store = Ft();
    for (const t of Object.keys(re(this, Qe)))
      this.reset(t);
  }
  /**
      Watches the given `key`, calling `callback` on any changes.
  
      @param key - The key to watch.
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidChange(t, n) {
    if (typeof t != "string")
      throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof t}`);
    if (typeof n != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof n}`);
    return this._handleChange(() => this.get(t), n);
  }
  /**
      Watches the whole config object, calling `callback` on any changes.
  
      @param callback - A callback function that is called on any changes. When a `key` is first set `oldValue` will be `undefined`, and when a key is deleted `newValue` will be `undefined`.
      @returns A function, that when called, will unsubscribe.
      */
  onDidAnyChange(t) {
    if (typeof t != "function")
      throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof t}`);
    return this._handleChange(() => this.store, t);
  }
  get size() {
    return Object.keys(this.store).length;
  }
  get store() {
    try {
      const t = K.readFileSync(this.path, re(this, Ze) ? null : "utf8"), n = this._encryptData(t), a = this._deserialize(n);
      return this._validate(a), Object.assign(Ft(), a);
    } catch (t) {
      if ((t == null ? void 0 : t.code) === "ENOENT")
        return this._ensureDirectory(), Ft();
      if (re(this, Ne).clearInvalidConfig && t.name === "SyntaxError")
        return Ft();
      throw t;
    }
  }
  set store(t) {
    this._ensureDirectory(), this._validate(t), this._write(t), this.events.dispatchEvent(new Event("change"));
  }
  *[Symbol.iterator]() {
    for (const [t, n] of Object.entries(this.store))
      yield [t, n];
  }
  _encryptData(t) {
    if (!re(this, Ze))
      return typeof t == "string" ? t : xc(t);
    try {
      const n = t.slice(0, 16), a = rn.pbkdf2Sync(re(this, Ze), n.toString(), 1e4, 32, "sha512"), s = rn.createDecipheriv(yc, a, n), i = t.slice(17), r = typeof i == "string" ? Es(i) : i;
      return xc(gc([s.update(r), s.final()]));
    } catch {
    }
    return t.toString();
  }
  _handleChange(t, n) {
    let a = t();
    const s = () => {
      const i = a, r = t();
      Bu(r, i) || (a = r, n.call(this, r, i));
    };
    return this.events.addEventListener("change", s), () => {
      this.events.removeEventListener("change", s);
    };
  }
  _validate(t) {
    if (!re(this, mt) || re(this, mt).call(this, t) || !re(this, mt).errors)
      return;
    const a = re(this, mt).errors.map(({ instancePath: s, message: i = "" }) => `\`${s.slice(1)}\` ${i}`);
    throw new Error("Config schema violation: " + a.join("; "));
  }
  _ensureDirectory() {
    K.mkdirSync(J.dirname(this.path), { recursive: !0 });
  }
  _write(t) {
    let n = this._serialize(t);
    if (re(this, Ze)) {
      const a = rn.randomBytes(16), s = rn.pbkdf2Sync(re(this, Ze), a.toString(), 1e4, 32, "sha512"), i = rn.createCipheriv(yc, s, a);
      n = gc([a, Es(":"), i.update(Es(n)), i.final()]);
    }
    if (me.env.SNAP)
      K.writeFileSync(this.path, n, { mode: re(this, Ne).configFileMode });
    else
      try {
        gl(this.path, n, { mode: re(this, Ne).configFileMode });
      } catch (a) {
        if ((a == null ? void 0 : a.code) === "EXDEV") {
          K.writeFileSync(this.path, n, { mode: re(this, Ne).configFileMode });
          return;
        }
        throw a;
      }
  }
  _watch() {
    this._ensureDirectory(), K.existsSync(this.path) || this._write(Ft()), me.platform === "win32" ? K.watch(this.path, { persistent: !1 }, Xo(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 100 })) : K.watchFile(this.path, { persistent: !1 }, Xo(() => {
      this.events.dispatchEvent(new Event("change"));
    }, { wait: 5e3 }));
  }
  _migrate(t, n, a) {
    let s = this._get(Ss, "0.0.0");
    const i = Object.keys(t).filter((l) => this._shouldPerformMigration(l, s, n));
    let r = { ...this.store };
    for (const l of i)
      try {
        a && a(this, {
          fromVersion: s,
          toVersion: l,
          finalVersion: n,
          versions: i
        });
        const c = t[l];
        c == null || c(this), this._set(Ss, l), s = l, r = { ...this.store };
      } catch (c) {
        throw this.store = r, new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${c}`);
      }
    (this._isVersionInRangeFormat(s) || !Dt.eq(s, n)) && this._set(Ss, n);
  }
  _containsReservedKey(t) {
    return typeof t == "object" && Object.keys(t)[0] === ea ? !0 : typeof t != "string" ? !1 : re(this, Ne).accessPropertiesByDotNotation ? !!t.startsWith(`${ea}.`) : !1;
  }
  _isVersionInRangeFormat(t) {
    return Dt.clean(t) === null;
  }
  _shouldPerformMigration(t, n, a) {
    return this._isVersionInRangeFormat(t) ? n !== "0.0.0" && Dt.satisfies(n, t) ? !1 : Dt.satisfies(a, t) : !(Dt.lte(t, n) || Dt.gt(t, a));
  }
  _get(t, n) {
    return kf(this.store, t, n);
  }
  _set(t, n) {
    const { store: a } = this;
    mo(a, t, n), this.store = a;
  }
}
mt = new WeakMap(), Ze = new WeakMap(), Ne = new WeakMap(), Qe = new WeakMap();
let bc = !1;
const $c = () => {
  if (!ee || !Je)
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  const e = {
    defaultCwd: Je.getPath("userData"),
    appVersion: Je.getVersion()
  };
  return bc || (ee.on("electron-store-get-data", (t) => {
    t.returnValue = e;
  }), bc = !0), e;
};
class Su extends mE {
  constructor(t) {
    let n, a;
    if (me.type === "renderer") {
      const s = Lu.ipcRenderer.sendSync("electron-store-get-data");
      if (!s)
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      ({ defaultCwd: n, appVersion: a } = s);
    } else ee && Je && ({ defaultCwd: n, appVersion: a } = $c());
    t = {
      name: "config",
      ...t
    }, t.projectVersion || (t.projectVersion = a), t.cwd ? t.cwd = J.isAbsolute(t.cwd) ? t.cwd : J.join(n, t.cwd) : t.cwd = n, t.configName = t.name, delete t.name, super(t);
  }
  static initRenderer() {
    $c();
  }
  async openInEditor() {
    const t = await Zs.openPath(this.path);
    if (t)
      throw new Error(t);
  }
}
const fE = Sc(import.meta.url), hE = _c(fE), wc = new Su(), vE = "export", gE = async (e) => {
  if (de.existsSync(e))
    try {
      await de.promises.unlink(e);
    } catch (t) {
      console.warn("error during cleanup:", t);
    }
};
ee.handle(
  `${vE}-pdf`,
  async (e, t) => {
    const n = Te.join(hE, "temp"), a = Te.join(n, "temporal-template.html");
    de.mkdirSync(n, { recursive: !0 }), de.writeFileSync(a, t.template);
    let s = null, i = "";
    try {
      s = new Kt({
        width: 595,
        // a4 size
        height: 842,
        show: !1,
        webPreferences: { nodeIntegration: !0 }
      });
      const r = Te.join(Je.getPath("temp"), "pdf-exports");
      await de.promises.mkdir(r, { recursive: !0 }), i = Te.join(r, `temp-${Date.now()}.html`), await de.promises.copyFile(a, i), await s.loadFile(i), await new Promise((f) => setTimeout(f, 1e3));
      const l = {
        printBackground: !0,
        ...t == null ? void 0 : t.config
      }, c = await s.webContents.printToPDF(l), o = wc.get("lastSavePath") || Je.getPath("documents"), { canceled: u, filePath: p } = await Du.showSaveDialog({
        defaultPath: Te.join(o, "Prescription - Patient Care.pdf"),
        filters: [{ name: "PDF", extensions: ["pdf"] }],
        properties: ["createDirectory"]
      });
      return u || !p ? { success: !1, canceled: !0 } : (!u && p && wc.set("lastSavePath", Te.dirname(p)), await de.promises.writeFile(p, c), { success: !0, path: p });
    } catch (r) {
      return console.error("error generating PDF:", r), {
        success: !1,
        error: r instanceof Error ? r.message : "unknown error"
      };
    } finally {
      de.unlinkSync(a), await gE(i), s && s.destroy();
    }
  }
);
const Or = "print", xE = Sc(import.meta.url), Ru = _c(xE);
ee.handle(
  `${Or}-load-printers`,
  async (e) => new Promise((t) => {
    const n = new Kt({
      show: !1,
      webPreferences: {
        nodeIntegration: !0,
        contextIsolation: !1
      }
    });
    n.loadURL("about:blank"), n.webContents.on("did-finish-load", async () => {
      try {
        const a = await n.webContents.getPrintersAsync();
        t(a);
      } catch (a) {
        console.error("Error getting printers:", a), t([]);
      } finally {
        n.close();
      }
    });
  })
);
ee.handle(
  `${Or}-silent`,
  async (e, t) => {
    if (!t.template || !t.printer)
      return { success: !1, error: "No template or printer provided" };
    const n = Te.join(Ru, "temp"), a = Te.join(n, "temporal-template.html");
    de.existsSync(n) || de.mkdirSync(n, { recursive: !0 }), de.writeFileSync(a, t.template);
    const s = new Kt({
      show: !1,
      webPreferences: {
        nodeIntegration: !0,
        contextIsolation: !1
      }
    });
    s && (s.loadURL(a), s.webContents.on("did-finish-load", async () => {
      s.webContents.print(
        {
          silent: !0,
          printBackground: !0,
          deviceName: t == null ? void 0 : t.printer,
          ...t == null ? void 0 : t.config
        },
        (i, r) => i ? { success: !1, error: r } : (de.unlinkSync(a), { success: !0 })
      );
    }));
  }
);
ee.handle(
  `${Or}-not-silent`,
  async (e, t) => {
    if (!t.template) return { success: !1, error: "No template" };
    const n = Te.join(Ru, "temp"), a = Te.join(n, "temporal-template.html");
    de.existsSync(n) || de.mkdirSync(n, { recursive: !0 }), de.writeFileSync(a, t.template);
    const s = new Kt({
      show: !1,
      webPreferences: {
        nodeIntegration: !0,
        contextIsolation: !1
      }
    });
    s && (s.loadURL(a), s.webContents.on("did-finish-load", async () => {
      s.webContents.print(
        { silent: !1, printBackground: !0, ...t == null ? void 0 : t.config },
        (i, r) => i ? { success: !1, error: r } : (de.unlinkSync(a), { success: !0 })
      );
    }));
  }
);
const ku = "converter";
ee.handle(
  `${ku}-RxLogo-image-64`,
  async (e) => `data:image/png;base64,${de.readFileSync(
    Te.join(process.cwd(), "public", "RxLogo.png")
  ).toString("base64")}`
);
ee.handle(
  `${ku}-image-64`,
  async (e, t) => {
    try {
      const n = await fetch(t);
      if (!n.ok)
        throw new Error(`HTTP error! status: ${n.status}`);
      const a = await n.arrayBuffer();
      return `data:image/png;base64,${Buffer.from(a).toString("base64")}`;
    } catch (n) {
      throw console.error(`Error al obtener la imagen: ${n}`), new Error("Error al convertir la imagen a base64");
    }
  }
);
const ju = "file-explorer";
ee.handle(
  `${ju}-open-file`,
  async (e, t) => {
    await Zs.openPath(t);
  }
);
ee.handle(
  `${ju}-open-folder`,
  async (e, t) => {
    await Zs.showItemInFolder(t);
  }
);
const Tu = new Su(), Ou = "config";
ee.handle(`${Ou}-load`, async (e) => Tu.store || {});
ee.handle(`${Ou}-save`, async (e, t) => {
  Object.keys(t).forEach((n) => {
    Tu.set(n, t[n]);
  });
});
_p.config();
const Js = J.dirname(Fu(import.meta.url));
process.env.APP_ROOT = J.join(Js, "..");
const Ys = process.env.VITE_DEV_SERVER_URL, ME = J.join(process.env.APP_ROOT, "dist-electron"), Pu = J.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Ys ? J.join(process.env.APP_ROOT, "public") : Pu;
let Ge;
function Nu() {
  Ge = new Kt({
    icon: J.join(Js, "../build/icon.png"),
    frame: !0,
    show: !1,
    resizable: !0,
    fullscreenable: !0,
    autoHideMenuBar: !0,
    width: 1040,
    height: 807,
    minWidth: 1040,
    minHeight: 807,
    webPreferences: {
      preload: J.join(Js, "preload.mjs")
    }
  }), Ge.maximize(), Ge.show(), Ge.webContents.on("did-finish-load", () => {
    Ge == null || Ge.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), Ys ? Ge.loadURL(Ys) : Ge.loadFile(J.join(Pu, "index.html"));
}
Je.on("window-all-closed", () => {
  process.platform !== "darwin" && (Je.quit(), Ge = null);
});
Je.on("activate", () => {
  Kt.getAllWindows().length === 0 && Nu();
});
Je.whenReady().then(Nu);
export {
  ME as MAIN_DIST,
  Pu as RENDERER_DIST,
  Ys as VITE_DEV_SERVER_URL
};
