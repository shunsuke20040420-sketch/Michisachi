import { ArrowLeft, CheckCircle2, Copy, Mail, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

const STORAGE_KEY = "michimachi:publication-inquiries";
const FORM_NAME = "waitlist";
const HONEYPOT_FIELD = "bot-field";
const NETLIFY_FORM_ENDPOINT = "/";
const contactEmail = import.meta.env.VITE_MICHIMACHI_CONTACT_EMAIL ?? "";

const inquiryTypes = [
  { value: "waitlist", label: "先行登録" },
  { value: "pro", label: "Pro先行登録" },
  { value: "feedback", label: "フィードバック" },
  { value: "test", label: "利用テスト希望" },
];

function readSavedInquiries() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveInquiry(inquiry) {
  if (typeof window === "undefined") return;
  const saved = readSavedInquiries();
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify([inquiry, ...saved].slice(0, 20)));
}

function isLocalPreview() {
  if (typeof window === "undefined") return false;
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function getInitialType() {
  if (typeof window === "undefined") return "waitlist";
  const requestedType = new URLSearchParams(window.location.search).get("type");
  return inquiryTypes.some((type) => type.value === requestedType) ? requestedType : "waitlist";
}

function buildMessage(inquiry) {
  const typeLabel =
    inquiryTypes.find((type) => type.value === inquiry.category)?.label ?? inquiry.category;

  return [
    "みちまち 先行価格フォーム",
    `名前: ${inquiry.name || "未入力"}`,
    `種別: ${typeLabel}`,
    `メール: ${inquiry.email}`,
    `内容: ${inquiry.message || "未入力"}`,
    `送信日時: ${new Date(inquiry.createdAt).toLocaleString("ja-JP")}`,
  ].join("\n");
}

export default function PublicationFormPage() {
  const [form, setForm] = useState({
    name: "",
    email:
      typeof window === "undefined"
        ? ""
        : new URLSearchParams(window.location.search).get("email") ?? "",
    category: getInitialType(),
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const [lastInquiry, setLastInquiry] = useState(null);
  const [copied, setCopied] = useState(false);

  const fallbackMessage = useMemo(
    () => (lastInquiry ? buildMessage(lastInquiry) : ""),
    [lastInquiry],
  );

  const mailtoHref = useMemo(() => {
    if (!contactEmail || !lastInquiry) return "";
    const subject = encodeURIComponent("みちまち 公開前フォーム");
    const body = encodeURIComponent(fallbackMessage);
    return `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }, [fallbackMessage, lastInquiry]);

  function updateField(fieldName, value) {
    setForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
    setError("");
    setCopied(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const rawFormData = new FormData(formElement);

    if (String(rawFormData.get(HONEYPOT_FIELD) ?? "").trim()) {
      return;
    }

    if (!form.email.trim()) {
      setError("メールアドレスを入力してください。");
      return;
    }

    if (!form.consent) {
      setError("送信内容の取り扱いに同意してください。");
      return;
    }

    const inquiry = {
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    };

    setLastInquiry(inquiry);

    if (isLocalPreview()) {
      setStatus("idle");
      setError("ローカルpreviewではNetlify Formsへ送信されません。公開URLで送信してください。");
      return;
    }

    setStatus("submitting");
    setError("");

    const body = new URLSearchParams({
      "form-name": FORM_NAME,
      name: inquiry.name,
      email: inquiry.email,
      category: inquiry.category,
      message: inquiry.message,
      consent: inquiry.consent ? "同意" : "",
    }).toString();

    try {
      const response = await fetch(NETLIFY_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });

      if (!response.ok) throw new Error("Form submission failed");
      saveInquiry(inquiry);
      setStatus("sent");
    } catch {
      setStatus("idle");
      setError("送信できませんでした。Netlifyのフォーム検出後に、公開URLからもう一度送信してください。");
    }
  }

  async function handleCopy() {
    if (!fallbackMessage) return;

    try {
      await navigator.clipboard.writeText(fallbackMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main className="publication-page" aria-labelledby="publication-title">
      <a className="publication-back" href="/">
        <ArrowLeft aria-hidden="true" size={18} />
        トップへ戻る
      </a>

      <section className="publication-hero">
        <div className="publication-copy">
          <p className="publication-kicker">リリース前限定</p>
          <h1 id="publication-title">先行価格を受け取る</h1>
          <p>
            Proの先行登録者価格 ¥6,800 / 年を押さえられます。
            先行登録だけでは課金されません。
          </p>
        </div>

        <form
          className="publication-form"
          action={NETLIFY_FORM_ENDPOINT}
          data-netlify="true"
          method="POST"
          name={FORM_NAME}
          netlify=""
          netlify-honeypot={HONEYPOT_FIELD}
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value={FORM_NAME} />
          <input type="hidden" name={HONEYPOT_FIELD} tabIndex="-1" autoComplete="off" />
          <input type="hidden" name="createdAt" value="" />

          <label className="publication-field">
            <span>
              <Mail aria-hidden="true" size={18} />
              お名前
            </span>
            <input
              autoComplete="name"
              name="name"
              onChange={(event) => updateField("name", event.target.value)}
              placeholder="山田 太郎"
              type="text"
              value={form.name}
            />
          </label>

          <label className="publication-field">
            <span>
              <Mail aria-hidden="true" size={18} />
              メールアドレス
            </span>
            <input
              autoComplete="email"
              name="email"
              onChange={(event) => updateField("email", event.target.value)}
              placeholder="you@example.com"
              type="email"
              value={form.email}
            />
          </label>

          <label className="publication-field">
            <span>
              <MessageSquare aria-hidden="true" size={18} />
              種別
            </span>
            <select
              name="category"
              onChange={(event) => updateField("category", event.target.value)}
              value={form.category}
            >
              {inquiryTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </label>

          <label className="publication-field">
            <span>
              <MessageSquare aria-hidden="true" size={18} />
              メッセージ・続けたい目標
            </span>
            <textarea
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="例: 朝に英語学習を続けたい、資格勉強を6週間続けたい"
              rows="5"
              value={form.message}
            />
          </label>

          <label className="publication-consent">
            <input
              checked={form.consent}
              name="consent"
              onChange={(event) => updateField("consent", event.target.checked)}
              type="checkbox"
              value="同意"
            />
            <span>
              入力内容を公開準備・プロトタイプ改善・連絡のために利用することに同意します。
              <a href="/privacy">プライバシーポリシー</a>
            </span>
          </label>

          {error ? <p className="publication-error">{error}</p> : null}

          <button className="publication-submit" disabled={status === "submitting"} type="submit">
            <Send aria-hidden="true" size={19} />
            {status === "submitting" ? "送信中" : "先行価格を受け取る"}
          </button>

          {status === "sent" ? (
            <div className="publication-result" role="status">
              <CheckCircle2 aria-hidden="true" size={22} />
              <div>
                <strong>送信ありがとうございました。先行案内をお送りします。</strong>
                <div className="publication-result__actions">
                  <button type="button" onClick={handleCopy}>
                    <Copy aria-hidden="true" size={17} />
                    {copied ? "コピー済み" : "内容をコピー"}
                  </button>
                  {mailtoHref ? (
                    <a href={mailtoHref}>
                      <Mail aria-hidden="true" size={17} />
                      メールで送る
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          ) : null}
        </form>
      </section>

      <section className="publication-notes" aria-label="送信前の確認">
        <article>
          <ShieldCheck aria-hidden="true" size={24} />
          <h2>個人情報の扱い</h2>
          <p>メールアドレスとメッセージは、公開準備・連絡・プロトタイプ改善にだけ使います。</p>
        </article>
        <article>
          <CheckCircle2 aria-hidden="true" size={24} />
          <h2>課金は発生しません</h2>
          <p>先行登録は価格と案内を受け取るための登録で、決済情報は取得しません。</p>
        </article>
      </section>
    </main>
  );
}
