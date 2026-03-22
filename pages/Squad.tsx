
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Plus, MoreHorizontal, Calendar as CalendarIcon, Target, Layout, Network, BrainCircuit, Share2 } from 'lucide-react';
import { MOCK_TASKS, MOCK_OKRS } from '../constants';
import { useMemory } from '../contexts/MemoryContext';
import { Calendar } from '../components/Calendar';

export const SquadPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('kanban');
  
  const { nodes, edges, isLoading, addConcept, currentUser } = useMemory();
  const [newConcept, setNewConcept] = useState('');

  const handleAddConcept = () => {
    if (!newConcept.trim()) return;
    addConcept(newConcept, 'concept');
    setNewConcept('');
  };

  const getConnections = (nodeId: string) => {
    return edges.filter(e => e.source === nodeId || e.target === nodeId).map(e => {
      const otherId = e.source === nodeId ? e.target : e.source;
      const otherNode = nodes.find(n => n.id === otherId);
      return { relationship: e.relationship, label: otherNode?.label || 'Unknown' };
    });
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500 min-h-[calc(100vh-8rem)]">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brown-900">Squad Alpha</h1>
          <p className="text-xs text-brown-800/60 mt-1 flex items-center gap-1">
             <BrainCircuit size={14} className="text-orange-500" />
             Conectado à Memória: <span className="font-semibold">{currentUser.companyId} / {currentUser.squadId}</span>
          </p>
        </div>
        <div className="flex -space-x-3">
           {[1, 2, 3, 4].map(i => (
             <img key={i} className="w-10 h-10 rounded-full border-2 border-cream-50 shadow-sm" src={`https://picsum.photos/100/100?random=${i}`} alt="Member" />
           ))}
           <div className="w-10 h-10 rounded-full border-2 border-cream-50 bg-cream-200 flex items-center justify-center text-brown-800 text-xs font-bold shadow-sm">+2</div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-hidden">
        
        <div className="lg:col-span-2 flex flex-col min-h-[500px]">
          <Card className="flex-1 flex flex-col p-0 overflow-hidden border-none shadow-none bg-transparent">
             <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4 px-1 overflow-x-auto">
                <TabsList className="bg-white border border-cream-300 shadow-sm">
                  <TabsTrigger value="kanban" className="gap-2"><Layout size={16}/> Kanban</TabsTrigger>
                  <TabsTrigger value="okrs" className="gap-2"><Target size={16}/> OKRs</TabsTrigger>
                  <TabsTrigger value="memory" className="gap-2 text-orange-700 data-[state=active]:text-orange-700 data-[state=active]:bg-orange-50"><Network size={16}/> Memória (Graph)</TabsTrigger>
                </TabsList>
                {activeTab === 'kanban' && <Button size="sm" variant="primary"><Plus size={16} className="mr-1" /> Novo Card</Button>}
              </div>

              <div className="flex-1 overflow-hidden">
                <TabsContent value="kanban" className="h-full overflow-x-auto pb-4 mt-0 touch-pan-x">
                  <div className="flex gap-4 h-full min-w-[800px]">
                    {['todo', 'doing', 'done'].map((status) => (
                      <div key={status} className="flex-1 flex flex-col bg-cream-100/50 rounded-xl p-3 border border-cream-200">
                        <div className="flex items-center justify-between mb-3 px-1">
                          <span className="text-sm font-bold uppercase text-brown-800/60 tracking-wider">
                            {status === 'todo' ? 'A Fazer' : status === 'doing' ? 'Em Progresso' : 'Concluído'}
                          </span>
                          <span className="bg-cream-200 text-brown-800 text-xs px-2 py-0.5 rounded-full">
                            {MOCK_TASKS.filter(t => t.status === status).length}
                          </span>
                        </div>
                        <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                          {MOCK_TASKS.filter(t => t.status === status).map(task => (
                            <div key={task.id} className="bg-white p-3 rounded-lg border border-cream-300 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                              <div className="flex justify-between items-start mb-2">
                                <Badge variant={task.priority === 'high' ? 'orange' : 'outline'} className="text-[10px]">
                                  {task.priority === 'high' ? 'Alta' : 'Normal'}
                                </Badge>
                                <button className="text-brown-800/30 hover:text-brown-800"><MoreHorizontal size={14} /></button>
                              </div>
                              <p className="text-sm font-medium text-brown-900 mb-3">{task.title}</p>
                              <div className="flex items-center justify-between">
                                <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-[10px] text-orange-700 font-bold border border-orange-200">
                                  {task.assignee.charAt(0)}
                                </div>
                                <span className="text-[10px] text-brown-800/40">#SQU-{task.id}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="okrs" className="h-full overflow-y-auto mt-0">
                  <div className="space-y-4">
                    {MOCK_OKRS.map(okr => (
                      <Card key={okr.id}>
                        <div className="flex items-start gap-4 mb-4">
                          <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
                            <Target size={24} />
                          </div>
                          <div>
                            <h3 className="font-serif font-bold text-lg text-brown-900">{okr.objective}</h3>
                            <p className="text-sm text-brown-800/60">Trimestre Q4 2023</p>
                          </div>
                        </div>
                        <div className="space-y-4">
                          {okr.keyResults.map(kr => (
                            <div key={kr.id}>
                              <div className="flex justify-between text-sm mb-1">
                                <span className="font-medium text-brown-800">{kr.title}</span>
                                <span className="text-orange-600 font-bold">{kr.progress}%</span>
                              </div>
                              <div className="h-2 bg-cream-200 rounded-full overflow-hidden">
                                <div className="h-full bg-orange-500 transition-all duration-1000" style={{ width: `${kr.progress}%` }}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="memory" className="h-full overflow-y-auto mt-0">
                  <div className="flex flex-col h-full bg-white rounded-xl border border-cream-300 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h3 className="text-lg font-serif font-bold text-brown-900">Memória Coletiva (Graph Cache)</h3>
                        <p className="text-sm text-brown-800/60">Conceitos e conexões armazenados no contexto deste Squad.</p>
                      </div>
                      <div className="flex gap-2">
                        <input 
                          className="px-3 py-1.5 border border-cream-300 rounded-lg text-sm focus:outline-none focus:border-orange-500"
                          placeholder="Novo conceito..."
                          value={newConcept}
                          onChange={(e) => setNewConcept(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleAddConcept()}
                        />
                        <Button size="sm" onClick={handleAddConcept}>Adicionar</Button>
                      </div>
                    </div>

                    {isLoading ? (
                       <div className="flex items-center justify-center h-40 text-brown-800/40">Carregando grafo...</div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                        {nodes.map(node => (
                          <div key={node.id} className="relative group border border-cream-200 rounded-xl p-4 hover:border-orange-300 hover:bg-cream-50 transition-all">
                             <div className="flex justify-between items-start">
                               <div>
                                 <Badge variant={node.createdBy === currentUser.id ? 'green' : 'outline'} className="mb-2 text-[10px] uppercase">
                                   {node.type}
                                 </Badge>
                                 <h4 className="font-bold text-brown-900">{node.label}</h4>
                                 <div className="mt-2 text-[10px] text-brown-800/40 flex items-center gap-1">
                                   Adicionado por {node.createdBy === currentUser.id ? 'você' : 'Squad'} 
                                 </div>
                               </div>
                               <div className="p-2 bg-white rounded-full border border-cream-200 text-orange-500">
                                 <Share2 size={16} />
                               </div>
                             </div>
                             <div className="mt-4 pt-3 border-t border-cream-200/50">
                               <p className="text-[10px] font-bold text-brown-800/50 mb-1 uppercase">Conexões</p>
                               <div className="space-y-1">
                                 {getConnections(node.id).length > 0 ? getConnections(node.id).map((conn, idx) => (
                                   <div key={idx} className="flex items-center text-xs text-brown-800">
                                     <span className="text-orange-600 mr-1 italic">{conn.relationship}</span> 
                                     <span className="truncate">{conn.label}</span>
                                   </div>
                                 )) : (
                                   <span className="text-[10px] text-brown-800/30 italic">Sem conexões</span>
                                 )}
                               </div>
                             </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>
              </div>
             </Tabs>
          </Card>
        </div>

        <div className="flex flex-col gap-6 h-full lg:h-auto">
          <Card className="shrink-0 p-5 border-cream-200 shadow-sm">
            <Calendar />
          </Card>

          <Card className="flex-1 bg-gradient-to-br from-orange-50 to-white border-orange-100 p-6 flex flex-col justify-center items-center text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 mb-4">
              <Target size={32} />
            </div>
            <h3 className="text-xl font-serif font-bold text-brown-900 mb-2">Foco no Objetivo</h3>
            <p className="text-sm text-brown-800/60 max-w-[250px]">
              Mantenha o squad alinhado aos OKRs e prazos definidos para este sprint.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
};
