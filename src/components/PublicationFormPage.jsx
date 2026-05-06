import { ArrowLeft, CheckCircle2, Copy, Mail, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { useMemo, useState } from "react";

const STORAGE_KEY = "michimachi:publication-inquiries";
const FORM_NAME = "michimachi-interest";
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

function encodeForm(data) {
  return new URLSearchParams(data).toString();
}

function buildMessage(inquiry) {
  const typeLabel = inquiryTypes.find((type) => type.value === inquiry.type)?.label ?? inquiry.type;

  return [
    "みちまち 公開前フォーム",
    `種別: ${typeLabel}`,
    `メール: ${inquiry.email}`,
    `内容: ${inquiry.message || "未入力"}`,
    `送信日時: ${new Date(inquiry.createdAt).toLocaleString("ja-JP")}`,
  ].join("\n");
}

export default function PublicationFormPage() {
  const [form, setForm] = useState({
    email:
      typeof window === "undefined"
        ? ""
        : new URLSearchParams(window.location.search).get("email") ?? "",
    type: getInitialType(),
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
      email: form.email.trim(),
      message: form.message.trim(),
      createdAt: new Date().toISOString(),
    };

    saveInquiry(inquiry);
    setLastInquiry(inquiry);

    if (isLocalPreview()) {
      setStatus("saved");
      return;
    }

    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeForm({
          "form-name": FORM_NAME,
          email: inquiry.email,
          type: inquiry.type,
          message: inquiry.message,
          consent: inquiry.consent ? "yes" : "no",
          createdAt: inquiry.createdAt,
        }),
      });

      if (!response.ok) throw new Error("Form submission failed");
      setStatus("sent");
    } catch {
      setStatus("saved");
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
          <p className="publication-kicker">公開前フォーム</p>
          <h1 id="publication-title">みちまちの先行登録・フィードバック</h1>
          <p>
            先行登録、利用テスト希望、気づいたことをここから送れます。
            送信内容は公開準備とプロトタイプ改善のために使います。
          </p>
        </div>

        <form className="publication-form" name={FORM_NAME} onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value={FORM_NAME} />

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
              name="type"
              onChange={(event) => updateField("type", event.target.value)}
              value={form.type}
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
              メッセージ
            </span>
            <textarea
              name="message"
              onChange={(event) => updateField("message", event.target.value)}
              placeholder="気になったこと、使ってみたい理由、試したい目標など"
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
            />
            <span>
              入力内容を公開準備・プロトタイプ改善・連絡のために利用することに同意します。
              <a href="/privacy">プライバシーポリシー</a>
            </span>
          </label>

          {error ? <p className="publication-error">{error}</p> : null}

          <button className="publication-submit" disabled={status === "submitting"} type="submit">
            <Send aria-hidden="true" size={19} />
            {status === "submitting" ? "送信中" : "送信する"}
          </button>

          {status === "sent" || status === "saved" ? (
            <div className="publication-result" role="status">
              <CheckCircle2 aria-hidden="true" size={22} />
              <div>
                <strong>{status === "sent" ? "送信しました" : "この端末に控えを保存しました"}</strong>
                <p>
                  Netlify Forms 対応環境では送信内容が管理画面に届きます。
                  それ以外の環境では下の控えを使って共有できます。
                </p>
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
          <p>先行登録は価格や案内を受け取るための登録で、決済情報は取得しません。</p>
        </article>
      </section>
    </main>
  );
}
