import React, { useEffect, useState } from "react";
import "../App.css";

const STORAGE_KEY = "one_to_one_inquiries_v1";

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function nowISO() {
  return new Date().toISOString();
}

function saveToStorage(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default function App() {
  const [items, setItems] = useState(() => loadFromStorage());
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  useEffect(() => {
    saveToStorage(items);
  }, [items]);

  function handleSubmit(form) {
    const newItem = {
      id: uid(),
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
      file: form.file || null,
      status: "pending",
      createdAt: nowISO(),
      reply: null,
      repliedAt: null,
    };
    setItems((s) => [newItem, ...s]);
    setShowForm(false);
  }

  function handleReply(id, replyText) {
    setItems((s) =>
      s.map((it) =>
        it.id === id
          ? { ...it, reply: replyText, status: "answered", repliedAt: nowISO() }
          : it
      )
    );
  }

  function handleDelete(id) {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    setItems((s) => s.filter((it) => it.id !== id));
    setSelected(null);
  }

  function filtered() {
    let r = items;
    if (filter === "pending") r = r.filter((i) => i.status === "pending");
    if (filter === "answered") r = r.filter((i) => i.status === "answered");
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter(
        (i) =>
          i.subject.toLowerCase().includes(q) ||
          i.message.toLowerCase().includes(q) ||
          i.name.toLowerCase().includes(q)
      );
    }
    return r;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-semibold">온라인 문의 1:1</h1>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isAdminMode}
                onChange={(e) => setIsAdminMode(e.target.checked)}
              />
              관리자 모드
            </label>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90"
              onClick={() => setShowForm(true)}
            >
              문의 작성
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <aside className="col-span-1">
            <div className="bg-white p-4 rounded shadow">
              <div className="flex gap-2 mb-3">
                <select
                  className="flex-1 border rounded px-2 py-1"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">전체</option>
                  <option value="pending">대기</option>
                  <option value="answered">답변완료</option>
                </select>
                <input
                  className="flex-1 border rounded px-2 py-1"
                  placeholder="검색 (제목/내용/작성자)"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="space-y-2 max-h-[60vh] overflow-auto">
                {filtered().length === 0 ? (
                  <div className="text-sm text-gray-500">검색 결과가 없습니다.</div>
                ) : (
                  filtered().map((it) => (
                    <button
                      key={it.id}
                      onClick={() => setSelected(it)}
                      className={`w-full text-left p-2 rounded border hover:bg-gray-50 flex flex-col gap-1 ${
                        selected?.id === it.id ? "bg-blue-50 border-blue-200" : ""
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <strong className="truncate">{it.subject}</strong>
                        <span className="text-xs text-gray-600">{it.status}</span>
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {it.name} · {new Date(it.createdAt).toLocaleString()}
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          <main className="col-span-2">
            <div className="bg-white p-4 rounded shadow min-h-[60vh]">
              {!selected ? (
                <div className="text-gray-600">문의 목록에서 항목을 선택하세요.</div>
              ) : (
                <DetailView
                  item={selected}
                  isAdmin={isAdminMode}
                  onReply={handleReply}
                  onDelete={handleDelete}
                  onClose={() => setSelected(null)}
                />
              )}
            </div>
          </main>
        </div>

        {showForm && (
          <FormModal onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
        )}
      </div>
    </div>
  );
}

function DetailView({ item, isAdmin, onReply, onDelete, onClose }) {
  const [replyText, setReplyText] = useState(item.reply || "");

  useEffect(() => {
    setReplyText(item.reply || "");
  }, [item]);

  return (
    <div>
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold">{item.subject}</h2>
          <div className="text-sm text-gray-500">{item.name} · {item.email}</div>
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 border rounded" onClick={onClose}>닫기</button>
          <button className="px-3 py-1 border rounded text-red-600" onClick={() => onDelete(item.id)}>삭제</button>
        </div>
      </div>

      <hr className="my-3" />

      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap">{item.message}</p>
        {item.file && (
          <div className="mt-3">
            <div className="text-sm text-gray-600">첨부파일:</div>
            <img src={item.file} alt="attachment" className="mt-2 max-w-xs border rounded" />
          </div>
        )}
      </div>

      <div className="mt-6">
        <div className="text-sm text-gray-600">상태: <strong>{item.status}</strong></div>
        {item.repliedAt && <div className="text-sm text-gray-500">답변일: {new Date(item.repliedAt).toLocaleString()}</div>}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium">관리자 답변</label>
        <textarea
          rows={6}
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
          className="w-full border rounded p-2 mt-1"
          placeholder={isAdmin ? "여기에 답변을 작성하세요." : "아직 답변이 없습니다."}
          readOnly={!isAdmin}
        />
        {isAdmin ? (
          <div className="flex gap-2 mt-2">
            <button
              className="px-4 py-2 bg-green-600 text-white rounded"
              onClick={() => onReply(item.id, replyText)}
            >
              답변 저장
            </button>
            <button className="px-4 py-2 border rounded" onClick={() => { setReplyText(item.reply || ""); }}>
              취소
            </button>
          </div>
        ) : (
          item.reply && (
            <div className="mt-2 p-3 bg-gray-50 border rounded">
              <div className="text-sm text-gray-700 whitespace-pre-wrap">{item.reply}</div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

function FormModal({ onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [filePreview, setFilePreview] = useState(null);

  function handleFile(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = () => setFilePreview(reader.result);
    reader.readAsDataURL(f);
  }

  function submit(e) {
    e.preventDefault();
    if (!name || !subject || !message) {
      alert("이름, 제목, 문의 내용을 입력해주세요.");
      return;
    }
    onSubmit({ name, email, subject, message, file: filePreview });
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
    setFilePreview(null);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
      <form onSubmit={submit} className="relative bg-white w-full max-w-xl p-6 rounded shadow z-10">
        <h3 className="text-lg font-semibold mb-3">문의 작성</h3>
        <div className="grid grid-cols-1 gap-2">
          <input className="border p-2 rounded" placeholder="이름" value={name} onChange={(e)=>setName(e.target.value)} />
          <input className="border p-2 rounded" placeholder="이메일(선택)" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <input className="border p-2 rounded" placeholder="제목" value={subject} onChange={(e)=>setSubject(e.target.value)} />
          <textarea className="border p-2 rounded" rows={6} placeholder="문의 내용을 입력하세요" value={message} onChange={(e)=>setMessage(e.target.value)} />
          <div className="flex items-center gap-2">
            <input type="file" accept="image/*" onChange={handleFile} />
            {filePreview && <img src={filePreview} alt="preview" className="h-12 rounded border" />}
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 border rounded" onClick={onClose}>취소</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">전송</button>
          </div>
        </div>
      </form>
    </div>
  );
}