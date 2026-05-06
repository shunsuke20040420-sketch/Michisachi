import { ArrowLeft, CheckCircle2, Mail, MessageSquare, Send, ShieldCheck } from "lucide-react";
import { useState } from "react";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfWeaSebT4nebCBWfPL2sGMZLkYqo2Ru6VqYul9UCB5bFXC8A/viewform?usp=publish-editor";

const inquiryTypes = [
  { value: "waitlist", label: "先行登録" },
  { value: "pro", label: "Pro先行登録" },
  { value: "feedback", label: "フィードバック" },
  { value: "test", label: "利用テスト希望" },
];

function getInitialType() {
  if (typeof window === "undefined") return "waitlist";
  const requestedType = new URLSearchParams(window.location.search).get("type");
  return inquiryTypes.some((type) => type.value === requestedType) ? requestedType : "waitlist";
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

  function updateField(fieldName, value) {
    setForm((currentForm) => ({ ...currentForm, [fieldName]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (typeof window !== "undefined") {
      window.open(FORM_URL, "_blank", "noopener,noreferrer");
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

        <form className="publication-form" onSubmit={handleSubmit}>
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

          <button className="publication-submit" type="submit">
            <Send aria-hidden="true" size={19} />
            先行価格を受け取る
          </button>

          <p className="publication-google-note">
            送信はGoogleフォームで受け付けています。メールアドレスと続けたい目標を入力してください。
          </p>
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
