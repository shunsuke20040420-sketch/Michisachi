import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";

const updatedAt = "2026年5月6日";

const privacySections = [
  {
    title: "取得する情報",
    body: "先行登録・フィードバックフォームでは、メールアドレス、選択した種別、メッセージ、送信日時を取得します。アプリのMVP体験では、入力した目標や最低条件などを利用者のブラウザのlocalStorageに保存する場合があります。",
  },
  {
    title: "利用目的",
    body: "取得した情報は、みちまちの公開準備、プロトタイプ改善、利用テストの連絡、先行登録に関する案内のために利用します。",
  },
  {
    title: "第三者サービス",
    body: "デプロイ先やフォーム受信には、Netlify、Vercel、GitHub Pagesなどの外部サービスを利用する場合があります。アクセス解析を追加する場合は、利用サービスと目的をこのページまたは公開告知で明示します。",
  },
  {
    title: "AI機能について",
    body: "AIレビューやAI相談の表現はプロトタイプ上の機能説明を含みます。公開前検証の段階では、医療、法律、投資などの専門判断を提供するものではありません。",
  },
  {
    title: "保存期間と削除",
    body: "フォームで受け取った情報は、検証目的に必要な期間だけ保持します。削除を希望する場合は、公開時に案内する問い合わせ先へ連絡してください。localStorage上のデータは利用者のブラウザ操作で削除できます。",
  },
];

const termsSections = [
  {
    title: "プロトタイプの位置づけ",
    body: "みちまちは公開前のプロトタイプです。画面、価格、機能、名称、提供範囲は予告なく変更されることがあります。",
  },
  {
    title: "料金と先行登録",
    body: "先行登録だけで課金は発生しません。課金が発生する機能を提供する場合は、事前に料金、支払い方法、解約条件を明示します。",
  },
  {
    title: "利用上の注意",
    body: "本サービスは習慣設計と目標整理を支援するためのものです。医療、法律、投資、その他専門的判断の代替として利用しないでください。",
  },
  {
    title: "禁止事項",
    body: "第三者の権利を侵害する行為、不正アクセス、過度な負荷をかける行為、公開前検証の妨げになる行為は禁止します。",
  },
  {
    title: "免責",
    body: "プロトタイプの利用により期待した成果が得られることを保証するものではありません。可能な範囲で改善を続けますが、提供の中断や変更が発生する場合があります。",
  },
];

function getContent(type) {
  if (type === "terms") {
    return {
      icon: FileText,
      title: "利用規約",
      lead: "みちまちの公開前プロトタイプを利用するときの基本的な条件です。",
      sections: termsSections,
    };
  }

  return {
    icon: ShieldCheck,
    title: "プライバシーポリシー",
    lead: "みちまちの公開前プロトタイプで扱う情報と、その使い道をまとめています。",
    sections: privacySections,
  };
}

export default function LegalPage({ type }) {
  const content = getContent(type);
  const Icon = content.icon;

  return (
    <main className="legal-page" aria-labelledby="legal-title">
      <a className="publication-back" href="/">
        <ArrowLeft aria-hidden="true" size={18} />
        トップへ戻る
      </a>

      <section className="legal-document">
        <div className="legal-document__heading">
          <span className="legal-document__icon" aria-hidden="true">
            <Icon size={28} />
          </span>
          <p className="publication-kicker">最終更新: {updatedAt}</p>
          <h1 id="legal-title">{content.title}</h1>
          <p>{content.lead}</p>
        </div>

        <div className="legal-document__body">
          {content.sections.map((section) => (
            <article key={section.title}>
              <h2>{section.title}</h2>
              <p>{section.body}</p>
            </article>
          ))}
        </div>

        <nav className="legal-document__links" aria-label="関連ページ">
          <a href="/contact">先行登録・フィードバック</a>
          <a href="/privacy">プライバシーポリシー</a>
          <a href="/terms">利用規約</a>
        </nav>
      </section>
    </main>
  );
}
