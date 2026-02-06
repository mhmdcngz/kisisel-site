'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'about'>('projects');

    // --- PROJE STATE'LERİ ---
    const [projects, setProjects] = useState<any[]>([]);
    const [editingProjectId, setEditingProjectId] = useState<number | null>(null);
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', tech_stack: '', github_url: '', demo_url: '', is_active: true
    });

    // --- YETENEK STATE'LERİ ---
    const [skills, setSkills] = useState<any[]>([]);
    const [editingSkillId, setEditingSkillId] = useState<number | null>(null);
    const [skillForm, setSkillForm] = useState({
        name: '', description: '', proficiency: 50
    });

    // --- HAKKIMDA STATE'LERİ ---
    const [aboutText, setAboutText] = useState('');

    // --- VERİ ÇEKME ---
    useEffect(() => {
        fetchProjects();
        fetchSkills();
        fetchAbout();
    }, []);

    const fetchProjects = async () => {
        const res = await fetch('/api/admin/projects');
        if (res.ok) setProjects(await res.json());
    };

    const fetchSkills = async () => {
        const res = await fetch('/api/admin/skills');
        if (res.ok) setSkills(await res.json());
    };

    const fetchAbout = async () => {
        const res = await fetch('/api/admin/about');
        if (res.ok) {
            const data = await res.json();
            setAboutText(data.about_text || '');
        }
    };

    const handleLogout = async () => {
        await fetch('/api/admin/logout', { method: 'POST' });
        router.push('/admin/login');
    };

    // --- PROJE FONKSİYONLARI ---
    const handleProjectSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingProjectId ? 'PUT' : 'POST';
        const body = editingProjectId ? { ...projectForm, id: editingProjectId } : projectForm;

        const res = await fetch('/api/admin/projects', {
            method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });

        if (res.ok) {
            fetchProjects();
            setEditingProjectId(null);
            setProjectForm({ title: '', description: '', tech_stack: '', github_url: '', demo_url: '', is_active: true });
            alert('İşlem başarılı!');
        }
    };

    const handleEditProject = (p: any) => {
        setEditingProjectId(p.id);
        setProjectForm({ ...p, is_active: Boolean(p.is_active) });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDeleteProject = async (id: number) => {
        if (!confirm('Silmek istediğine emin misin?')) return;
        const res = await fetch('/api/admin/projects', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        if (res.ok) fetchProjects();
    };

    // --- YETENEK FONKSİYONLARI ---
    const handleSkillSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingSkillId ? 'PUT' : 'POST';
        const body = editingSkillId ? { ...skillForm, id: editingSkillId } : skillForm;

        const res = await fetch('/api/admin/skills', {
            method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
        });

        if (res.ok) {
            fetchSkills();
            setEditingSkillId(null);
            setSkillForm({ name: '', description: '', proficiency: 50 });
            alert('Yetenek kaydedildi!');
        }
    };

    const handleEditSkill = (s: any) => {
        setEditingSkillId(s.id);
        setSkillForm({ name: s.name, description: s.description, proficiency: s.proficiency });
    };

    const handleDeleteSkill = async (id: number) => {
        if (!confirm('Bu yeteneği silmek istediğine emin misin?')) return;
        const res = await fetch('/api/admin/skills', { method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id }) });
        if (res.ok) fetchSkills();
    };

    // --- HAKKIMDA FONKSİYONLARI ---
    const handleAboutSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('/api/admin/about', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ about_text: aboutText })
        });

        if (res.ok) {
            alert('Hakkımda yazısı güncellendi!');
        } else {
            alert('Bir hata oluştu.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-950 text-white p-8 font-sans">
            <div className="max-w-6xl mx-auto">
                {/* HEADER */}
                <div className="flex justify-between items-center mb-8 border-b border-gray-800 pb-4">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Yönetim Paneli</h1>
                    <button onClick={handleLogout} className="text-red-400 text-sm border border-red-500/20 px-3 py-1 rounded hover:bg-red-500/10">Çıkış Yap</button>
                </div>

                {/* SEKME BUTONLARI */}
                <div className="flex gap-4 mb-8">
                    <button
                        onClick={() => setActiveTab('projects')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'projects' ? 'bg-blue-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
                    >
                        📂 Projeler
                    </button>
                    <button
                        onClick={() => setActiveTab('skills')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'skills' ? 'bg-purple-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
                    >
                        ⚡ Yetenekler
                    </button>
                    <button
                        onClick={() => setActiveTab('about')}
                        className={`px-6 py-2 rounded-lg font-medium transition-all ${activeTab === 'about' ? 'bg-cyan-600 text-white' : 'bg-gray-900 text-gray-400 hover:bg-gray-800'}`}
                    >
                        📝 Hakkımda
                    </button>
                </div>

                {/* --- PROJELER SEKMESİ --- */}
                {activeTab === 'projects' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Proje Formu */}
                        <div className="lg:col-span-1 bg-gray-900/50 p-6 rounded-xl border border-gray-800 h-fit sticky top-4">
                            <h2 className="text-xl font-bold text-blue-400 mb-4">{editingProjectId ? 'Projeyi Düzenle' : 'Yeni Proje'}</h2>
                            <form onSubmit={handleProjectSubmit} className="space-y-4">
                                <input type="text" placeholder="Başlık" className="w-full bg-gray-950 p-2 rounded border border-gray-800" value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                                <textarea placeholder="Açıklama" className="w-full bg-gray-950 p-2 rounded border border-gray-800 h-24" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
                                <input type="text" placeholder="Teknolojiler (Java, SQL)" className="w-full bg-gray-950 p-2 rounded border border-gray-800" value={projectForm.tech_stack} onChange={e => setProjectForm({ ...projectForm, tech_stack: e.target.value })} />
                                <div className="grid grid-cols-2 gap-2">
                                    <input type="url" placeholder="GitHub URL" className="w-full bg-gray-950 p-2 rounded border border-gray-800" value={projectForm.github_url} onChange={e => setProjectForm({ ...projectForm, github_url: e.target.value })} />
                                    <input type="url" placeholder="Demo URL" className="w-full bg-gray-950 p-2 rounded border border-gray-800" value={projectForm.demo_url} onChange={e => setProjectForm({ ...projectForm, demo_url: e.target.value })} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" checked={projectForm.is_active} onChange={e => setProjectForm({ ...projectForm, is_active: e.target.checked })} />
                                    <span className="text-sm text-gray-400">Yayında</span>
                                </div>
                                <button type="submit" className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-500">{editingProjectId ? 'Güncelle' : 'Ekle'}</button>
                                {editingProjectId && <button type="button" onClick={() => { setEditingProjectId(null); setProjectForm({ title: '', description: '', tech_stack: '', github_url: '', demo_url: '', is_active: true }) }} className="w-full bg-gray-700 py-2 rounded mt-2">İptal</button>}
                            </form>
                        </div>
                        {/* Proje Listesi */}
                        <div className="lg:col-span-2 space-y-4">
                            {projects.map(p => (
                                <div key={p.id} className={`bg-gray-900 p-4 rounded-lg border border-gray-800 flex justify-between items-center ${!p.is_active ? 'opacity-50' : ''}`}>
                                    <div>
                                        <h3 className="font-bold text-lg">{p.title}</h3>
                                        <p className="text-sm text-gray-400">{p.tech_stack}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button onClick={() => handleEditProject(p)} className="text-blue-400 text-sm px-3 py-1 bg-blue-500/10 rounded">Düzenle</button>
                                        <button onClick={() => handleDeleteProject(p.id)} className="text-red-400 text-sm px-3 py-1 bg-red-500/10 rounded">Sil</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- YETENEKLER SEKMESİ --- */}
                {activeTab === 'skills' && (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Yetenek Formu */}
                        <div className="lg:col-span-1 bg-gray-900/50 p-6 rounded-xl border border-gray-800 h-fit sticky top-4">
                            <h2 className="text-xl font-bold text-purple-400 mb-4">{editingSkillId ? 'Yeteneği Düzenle' : 'Yeni Yetenek'}</h2>
                            <form onSubmit={handleSkillSubmit} className="space-y-4">
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">Yetenek Adı</label>
                                    <input type="text" placeholder="Örn: Java" className="w-full bg-gray-950 p-2 rounded border border-gray-800" value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">Detaylı Açıklama</label>
                                    <textarea placeholder="Örn: Spring Boot ile REST API geliştirme deneyimi..." className="w-full bg-gray-950 p-2 rounded border border-gray-800 h-24" value={skillForm.description} onChange={e => setSkillForm({ ...skillForm, description: e.target.value })} />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 block mb-1">Seviye: %{skillForm.proficiency}</label>
                                    <input type="range" min="0" max="100" className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer" value={skillForm.proficiency} onChange={e => setSkillForm({ ...skillForm, proficiency: parseInt(e.target.value) })} />
                                </div>
                                <button type="submit" className="w-full bg-purple-600 py-2 rounded text-white hover:bg-purple-500">{editingSkillId ? 'Güncelle' : 'Ekle'}</button>
                                {editingSkillId && <button type="button" onClick={() => { setEditingSkillId(null); setSkillForm({ name: '', description: '', proficiency: 50 }) }} className="w-full bg-gray-700 py-2 rounded mt-2">İptal</button>}
                            </form>
                        </div>
                        {/* Yetenek Listesi */}
                        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {skills.map(s => (
                                <div key={s.id} className="bg-gray-900 p-5 rounded-lg border border-gray-800 group hover:border-purple-500/30 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-lg text-white">{s.name}</h3>
                                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => handleEditSkill(s)} className="text-blue-400 hover:text-blue-300">✎</button>
                                            <button onClick={() => handleDeleteSkill(s.id)} className="text-red-400 hover:text-red-300">🗑</button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 mb-4 h-10 line-clamp-2">{s.description}</p>
                                    <div className="w-full bg-gray-800 rounded-full h-2">
                                        <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${s.proficiency}%` }}></div>
                                    </div>
                                    <div className="text-right text-xs text-purple-400 mt-1">%{s.proficiency}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* --- HAKKIMDA SEKMESİ --- */}
                {activeTab === 'about' && (
                    <div className="max-w-2xl mx-auto bg-gray-900/50 p-8 rounded-xl border border-gray-800">
                        <h2 className="text-xl font-bold text-cyan-400 mb-6">Hakkımda Yazısını Düzenle</h2>
                        <form onSubmit={handleAboutSubmit} className="space-y-6">
                            <div>
                                <label className="text-sm text-gray-400 block mb-2">Kendini Tanıt</label>
                                <textarea
                                    placeholder="Merhaba, ben..."
                                    className="w-full bg-gray-950 p-4 rounded border border-gray-800 h-64 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all leading-relaxed"
                                    value={aboutText}
                                    onChange={e => setAboutText(e.target.value)}
                                />
                                <p className="text-xs text-gray-500 mt-2">Bu yazı ana sayfadaki Hero bölümünde görünecektir.</p>
                            </div>
                            <button type="submit" className="w-full bg-cyan-600 py-3 rounded text-white font-bold hover:bg-cyan-500 transition-colors shadow-lg shadow-cyan-500/20">
                                Değişiklikleri Kaydet
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}