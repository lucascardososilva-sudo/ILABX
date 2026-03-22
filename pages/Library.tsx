
import React, { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Search, Hash, Lock, Unlock, ExternalLink, X, Bell, UserCheck, Plus, Globe, ShieldCheck } from 'lucide-react';
import { libraryService } from '../services/LibraryService';
import { Invention } from '../types';

const CURRENT_USER_SQUAD_ID = 'alpha';

export const LibraryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventions, setInventions] = useState<Invention[]>([]);
  const [selectedInvention, setSelectedInvention] = useState<Invention | null>(null);
  const [accessRequests, setAccessRequests] = useState<Record<string, 'none' | 'pending' | 'approved'>>({});
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'success'} | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Invention Form State
  const [newInv, setNewInv] = useState({
    title: '',
    shortDescription: '',
    fullDescription: '',
    tags: '',
    ownerSquad: 'Squad Alpha',
    ownerSquadId: CURRENT_USER_SQUAD_ID,
    links: [{ label: 'Demonstração', url: '#' }]
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setInventions(libraryService.getInventions());
    setAccessRequests(libraryService.getAccessRequests());
  };

  const filteredInventions = inventions.filter(inv => 
    inv.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    inv.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleRequestAccess = (id: string) => {
    libraryService.updateAccess(id, 'pending');
    loadData();
    setNotification({
      message: 'Solicitação enviada para o Squad proprietário.',
      type: 'info'
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSimulateOwnerApproval = (id: string) => {
    libraryService.updateAccess(id, 'approved');
    loadData();
    setNotification({
      message: `Acesso liberado pelo Squad proprietário!`,
      type: 'success'
    });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleAddInvention = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInv.title || !newInv.shortDescription) return;
    
    libraryService.addInvention({
      ...newInv,
      tags: newInv.tags.split(',').map(t => t.trim()),
      links: newInv.links
    });
    
    loadData();
    setIsAddModalOpen(false);
    setNewInv({
      title: '',
      shortDescription: '',
      fullDescription: '',
      tags: '',
      ownerSquad: 'Squad Alpha',
      ownerSquadId: CURRENT_USER_SQUAD_ID,
      links: [{ label: 'Demonstração', url: '#' }]
    });
    setNotification({ message: 'Nova invenção cadastrada com sucesso!', type: 'success' });
    setTimeout(() => setNotification(null), 3000);
  };

  const isOwner = (inv: Invention) => inv.ownerSquadId === CURRENT_USER_SQUAD_ID;
  const getStatus = (id: string) => accessRequests[id] || 'none';

  return (
    <div className="animate-in fade-in duration-500 relative min-h-[calc(100vh-8rem)]">
      
      {notification && (
        <div className={`fixed top-20 right-4 md:right-8 z-50 p-4 rounded-xl shadow-lg border animate-in slide-in-from-right-10 flex items-center gap-3 max-w-[90%] md:max-w-md
          ${notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' : 'bg-orange-50 border-orange-200 text-brown-900'}
        `}>
          {notification.type === 'success' ? <UserCheck size={20} className="shrink-0" /> : <Bell size={20} className="shrink-0" />}
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mb-2">Biblioteca de Inovação</h1>
          <p className="text-brown-800/70 text-sm md:text-base">Explore tecnologias e descobertas compartilhadas entre os squads.</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="gap-2">
          <Plus size={18} /> Cadastrar Invenção
        </Button>
      </div>

      <div className="relative max-w-md mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/40" size={18} />
        <input 
          type="text" 
          placeholder="Buscar por título ou tag..." 
          className="w-full pl-10 pr-4 py-3 bg-white border border-cream-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-brown-800 shadow-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInventions.map(inv => (
          <Card 
            key={inv.id} 
            className="cursor-pointer hover:-translate-y-1 transition-all duration-300 hover:shadow-lg group h-full flex flex-col"
          >
            <div onClick={() => setSelectedInvention(inv)} className="flex-1 flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-orange-50 rounded-lg text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Hash size={24} />
                </div>
                {isOwner(inv) ? (
                  <Badge variant="outline" className="opacity-70">Seu Squad</Badge>
                ) : (
                  <Badge variant="default" className="opacity-50 text-[10px]">{inv.ownerSquad}</Badge>
                )}
              </div>
              
              <h3 className="text-xl font-serif font-bold text-brown-900 mb-2 leading-tight group-hover:text-orange-600 transition-colors">
                {inv.title}
              </h3>
              
              <p className="text-sm text-brown-800/70 mb-4 line-clamp-3 flex-1">
                {inv.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {inv.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-1 bg-cream-100 text-brown-800/60 rounded-md font-medium">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Invention Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-brown-900/40 backdrop-blur-sm" onClick={() => setIsAddModalOpen(false)}></div>
          <Card className="relative w-full max-w-lg z-10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-bold text-brown-900">Cadastrar Invenção</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-brown-800/40 hover:text-brown-800"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddInvention} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-brown-800/60 mb-1">Título</label>
                <input required className="w-full px-3 py-2 border border-cream-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none" value={newInv.title} onChange={e => setNewInv({...newInv, title: e.target.value})} placeholder="Ex: IA para Petições" />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-brown-800/60 mb-1">Descrição Curta</label>
                <textarea required className="w-full px-3 py-2 border border-cream-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none h-20 resize-none" value={newInv.shortDescription} onChange={e => setNewInv({...newInv, shortDescription: e.target.value})} placeholder="Resumo de 2 linhas..." />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-brown-800/60 mb-1">Descrição Completa</label>
                <textarea className="w-full px-3 py-2 border border-cream-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none h-32 resize-none" value={newInv.fullDescription} onChange={e => setNewInv({...newInv, fullDescription: e.target.value})} placeholder="Detalhes técnicos e benefícios..." />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-brown-800/60 mb-1">Tags (separadas por vírgula)</label>
                <input className="w-full px-3 py-2 border border-cream-300 rounded-lg focus:ring-1 focus:ring-orange-500 outline-none" value={newInv.tags} onChange={e => setNewInv({...newInv, tags: e.target.value})} placeholder="IA, Legal, Design..." />
              </div>
              <Button type="submit" className="w-full">Publicar na Biblioteca</Button>
            </form>
          </Card>
        </div>
      )}

      {/* Detail Modal */}
      {selectedInvention && (
        <div className="fixed inset-0 z-40 flex items-end md:items-center justify-center p-0 md:p-4">
          <div className="absolute inset-0 bg-brown-900/30 backdrop-blur-sm" onClick={() => setSelectedInvention(null)}></div>
          
          <div className="bg-white rounded-t-2xl md:rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] md:max-h-[90vh] overflow-y-auto relative z-50 animate-in slide-in-from-bottom-10 md:zoom-in-95 duration-200 m-0 md:m-4">
            <button 
              onClick={() => setSelectedInvention(null)}
              className="absolute top-4 right-4 p-2 hover:bg-cream-100 rounded-full text-brown-800/60 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-6 md:p-8">
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-2">
                   <span className="text-orange-600 font-bold text-sm tracking-wider uppercase">Invenção</span>
                   <span className="text-brown-800/30">•</span>
                   <span className="text-brown-800/60 text-sm font-medium">{selectedInvention.ownerSquad}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brown-900 mb-4">{selectedInvention.title}</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedInvention.tags.map(tag => (
                    <Badge key={tag} variant="orange" className="bg-orange-50 text-orange-700 border-orange-100">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="prose prose-brown max-w-none mb-8">
                <p className="text-brown-800/80 leading-relaxed text-base md:text-lg">
                  {selectedInvention.fullDescription || selectedInvention.shortDescription}
                </p>
              </div>

              <div className="bg-cream-50 rounded-xl p-6 border border-cream-200">
                <h3 className="font-semibold text-brown-900 mb-4 flex items-center gap-2">
                  Links de Acesso
                  {!isOwner(selectedInvention) && getStatus(selectedInvention.id) !== 'approved' && <Lock size={14} className="text-brown-800/40"/>}
                </h3>

                <div className="space-y-3">
                  {isOwner(selectedInvention) || getStatus(selectedInvention.id) === 'approved' ? (
                    selectedInvention.links.map((link, idx) => (
                      <a 
                        key={idx} 
                        href={link.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 bg-white border border-cream-200 rounded-lg hover:border-orange-300 hover:shadow-sm transition-all group"
                      >
                        <span className="font-medium text-brown-800 group-hover:text-orange-600 flex items-center gap-2">
                          <ExternalLink size={16} /> {link.label}
                        </span>
                        <Badge variant="green" className="bg-green-50 text-green-700">Liberado</Badge>
                      </a>
                    ))
                  ) : (
                    <div className="space-y-4">
                      {selectedInvention.links.map((link, idx) => (
                         <div key={idx} className="flex items-center justify-between p-3 bg-cream-100/50 border border-cream-200 rounded-lg opacity-60 select-none cursor-not-allowed">
                            <span className="font-medium text-brown-800 flex items-center gap-2">
                              <Lock size={16} /> {link.label}
                            </span>
                            <span className="text-xs text-brown-800/40">Restrito</span>
                         </div>
                      ))}
                      
                      <div className="mt-4 pt-4 border-t border-cream-200">
                        {getStatus(selectedInvention.id) === 'none' ? (
                          <div className="flex flex-col gap-2">
                            <p className="text-sm text-brown-800/70 mb-2">Este recurso pertence a outro Squad. Solicite permissão para acessar.</p>
                            <Button onClick={() => handleRequestAccess(selectedInvention.id)} className="w-full sm:w-auto">
                              Solicitar Acesso ao {selectedInvention.ownerSquad}
                            </Button>
                          </div>
                        ) : (
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex flex-col gap-3">
                             <div className="flex items-center gap-3">
                               <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                               <p className="text-blue-800 text-sm font-medium">Aguardando aprovação do Squad...</p>
                             </div>
                             <button onClick={() => handleSimulateOwnerApproval(selectedInvention.id)} className="text-xs text-blue-600 underline text-left">Simular Aprovação (Demo)</button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
