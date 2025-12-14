import React, { useEffect, useState } from "react";

// 私のGitHub情報
const repoOwner = "j22378fs";
const repoName = "Twistter";

export default function App() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/profiles.json")
      .then((res) => res.json())
      .then((data) => {
        setProfiles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openNewIssue = (twitter, comment) => {
    const title = encodeURIComponent(`プロフィール投稿: @${twitter}`);
    const body = encodeURIComponent(
      `Twitter: @${twitter}\n\n一言: ${comment}\n\n※ このIssueはTwistter用の投稿です`
    );
    const url = `https://github.com/${repoOwner}/${repoName}/issues/new?title=${title}&body=${body}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">卒論制作SNS中継サイト"Twistter"</h1>
        <p className="text-gray-600 mb-6">
          TwitterのIDと一言を投稿して、友達を探そう
        </p>
<a
  href="https://docs.google.com/forms/d/1Jy3949v9WOTwGJmg9Vu5oUJPuglckM7i5AU6cO06V3g/viewform?chromeless=1&edit_requested=true"
  target="_blank"
  rel="noopener noreferrer"
  className="text-sky-600 underline mb-6 inline-block"
>
  ▶ Googleフォームのアンケートにご協力ください
</a>


        {/* 投稿エリア */}
        <div className="bg-white p-4 rounded-xl shadow mb-8">
          <h2 className="font-semibold mb-3">プロフィールを投稿</h2>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              id="twitter"
              placeholder="Twitter ID（例: your_id）"
              className="flex-1 border rounded px-3 py-2"
            />
            <input
              id="comment"
              placeholder="一言コメント"
              className="flex-1 border rounded px-3 py-2"
            />
            <button
              className="bg-sky-600 text-white px-4 py-2 rounded"
              onClick={() => {
                const twitter = document.getElementById("twitter").value;
                const comment = document.getElementById("comment").value;
                openNewIssue(twitter, comment);
              }}
            >
              投稿
            </button>
          </div>
        </div>

        {/* 一覧表示 */}
        <h2 className="font-semibold mb-4">みんなのプロフィール</h2>

        {loading ? (
          <p>読み込み中...</p>
        ) : profiles.length === 0 ? (
          <p className="text-gray-500">まだ投稿がありません</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {profiles.map((p, i) => (
              <div
                key={i}
                className="bg-white p-4 rounded-xl shadow"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://unavatar.io/twitter/${p.twitter.replace(
                      "@",
                      ""
                    )}`}
                    alt=""
                    className="w-4 h-10 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{p.name || p.twitter}</div>
                    <div className="text-sm text-gray-500">{p.twitter}</div>
                  </div>
                </div>
                <p className="mt-3 text-gray-700">{p.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
