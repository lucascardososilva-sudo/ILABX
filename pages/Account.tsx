import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { 
  User, 
  Settings, 
  Shield, 
  Bell, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase,
  Lock,
  Eye,
  EyeOff,
  LogOut,
  Save,
  CheckCircle2
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-brown-900">Minha Conta</h1>
          <p className="text-brown-800/60 mt-1">Gerencie suas informações pessoais e preferências da plataforma.</p>
        </div>
        <Button variant="outline" className="text-red-600 border-red-100 hover:bg-red-50 hover:text-red-700 gap-2">
          <LogOut size={18} /> Sair da Conta
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 lg:flex lg:flex-col h-auto bg-cream-100/50 lg:bg-transparent border-none p-1 lg:p-0 gap-1 md:gap-2 rounded-2xl lg:rounded-none">
              <TabsTrigger 
                value="profile" 
                className="justify-center lg:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm data-[state=active]:bg-brown-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
              >
                <User size={16} className="md:w-[18px] md:h-[18px]" /> <span className="truncate">Perfil</span>
              </TabsTrigger>
              <TabsTrigger 
                value="settings" 
                className="justify-center lg:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm data-[state=active]:bg-brown-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
              >
                <Settings size={16} className="md:w-[18px] md:h-[18px]" /> <span className="truncate">Ajustes</span>
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="justify-center lg:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm data-[state=active]:bg-brown-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
              >
                <Shield size={16} className="md:w-[18px] md:h-[18px]" /> <span className="truncate">Segurança</span>
              </TabsTrigger>
              <TabsTrigger 
                value="notifications" 
                className="justify-center lg:justify-start gap-2 md:gap-3 px-3 md:px-4 py-2.5 md:py-3 rounded-xl text-xs md:text-sm data-[state=active]:bg-brown-900 data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
              >
                <Bell size={16} className="md:w-[18px] md:h-[18px]" /> <span className="truncate">Alertas</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          <Card className="border-cream-300 shadow-sm overflow-hidden">
            <div className="p-4 md:p-8">
              {activeTab === 'profile' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-cream-200">
                    <div className="relative group">
                      <img 
                        src="https://picsum.photos/200/200" 
                        alt="Avatar" 
                        className="w-24 h-24 rounded-full object-cover border-4 border-cream-100 shadow-sm"
                      />
                      <button className="absolute bottom-0 right-0 p-2 bg-brown-900 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors">
                        <Camera size={16} />
                      </button>
                    </div>
                    <div className="text-center sm:text-left">
                      <h2 className="text-xl font-bold text-brown-900">Dra. Amanda Silva</h2>
                      <p className="text-brown-800/60 text-sm mb-3">Líder Squad Alpha • Lab Inovação Jurídica</p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                        <Badge variant="orange">Membro Premium</Badge>
                        <Badge variant="outline">USP Direito</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brown-800/40 uppercase tracking-wider">Nome Completo</label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/30" size={16} />
                        <input 
                          type="text" 
                          defaultValue="Amanda Silva" 
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brown-800/40 uppercase tracking-wider">E-mail Acadêmico</label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/30" size={16} />
                        <input 
                          type="email" 
                          defaultValue="amanda.silva@usp.br" 
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brown-800/40 uppercase tracking-wider">Telefone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/30" size={16} />
                        <input 
                          type="text" 
                          defaultValue="+55 (11) 98765-4321" 
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-brown-800/40 uppercase tracking-wider">Cargo / Função</label>
                      <div className="relative">
                        <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-800/30" size={16} />
                        <input 
                          type="text" 
                          defaultValue="Líder de Squad" 
                          className="w-full pl-10 pr-4 py-2.5 bg-cream-50 border border-cream-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-cream-200 flex justify-end gap-3">
                    <Button variant="ghost" className="text-brown-800/60">Cancelar</Button>
                    <Button 
                      onClick={handleSave} 
                      disabled={isSaving}
                      className="bg-brown-900 hover:bg-brown-800 text-white min-w-[140px]"
                    >
                      {isSaving ? 'Salvando...' : saved ? (
                        <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Salvo!</span>
                      ) : (
                        <span className="flex items-center gap-2"><Save size={18} /> Salvar Alterações</span>
                      )}
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-serif font-bold text-brown-900 mb-4">Preferências da Plataforma</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl border border-cream-200">
                      <div>
                        <p className="font-bold text-brown-900 text-sm">Modo Escuro</p>
                        <p className="text-xs text-brown-800/50">Alternar entre tema claro e escuro.</p>
                      </div>
                      <div className="w-12 h-6 bg-cream-300 rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl border border-cream-200">
                      <div>
                        <p className="font-bold text-brown-900 text-sm">Idioma da Interface</p>
                        <p className="text-xs text-brown-800/50">Português (Brasil)</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-orange-600">Alterar</Button>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-cream-50 rounded-xl border border-cream-200">
                      <div>
                        <p className="font-bold text-brown-900 text-sm">Privacidade do Perfil</p>
                        <p className="text-xs text-brown-800/50">Tornar perfil visível para outros squads.</p>
                      </div>
                      <div className="w-12 h-6 bg-orange-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-serif font-bold text-brown-900 mb-4">Segurança e Acesso</h3>
                  
                  <div className="space-y-6">
                    <div className="p-4 bg-cream-50 rounded-xl border border-cream-200 space-y-4">
                      <div className="flex items-center gap-3 text-brown-900">
                        <Lock size={18} className="text-orange-500" />
                        <span className="font-bold text-sm">Alterar Senha</span>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-bold text-brown-800/40 uppercase">Senha Atual</label>
                          <div className="relative">
                            <input 
                              type={showPassword ? "text" : "password"} 
                              className="w-full px-4 py-2 bg-white border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                            <button 
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-800/30"
                            >
                              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                            </button>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brown-800/40 uppercase">Nova Senha</label>
                            <input 
                              type="password" 
                              className="w-full px-4 py-2 bg-white border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-bold text-brown-800/40 uppercase">Confirmar Nova Senha</label>
                            <input 
                              type="password" 
                              className="w-full px-4 py-2 bg-white border border-cream-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                            />
                          </div>
                        </div>
                      </div>
                      <Button size="sm" className="bg-brown-900 text-white">Atualizar Senha</Button>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-100 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Shield size={20} className="text-orange-600" />
                        <div>
                          <p className="font-bold text-brown-900 text-sm">Autenticação em Duas Etapas</p>
                          <p className="text-xs text-brown-800/50">Adicione uma camada extra de segurança.</p>
                        </div>
                      </div>
                      <Button size="sm" variant="primary">Configurar</Button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h3 className="text-lg font-serif font-bold text-brown-900 mb-4">Configurações de Notificação</h3>
                  
                  <div className="space-y-2">
                    {[
                      { title: 'Atualizações do Squad', desc: 'Receba avisos sobre novos cards e comentários no Kanban.' },
                      { title: 'Prazos e Entregas', desc: 'Alertas sobre datas de entrega e marcos do projeto.' },
                      { title: 'Novos Conteúdos', desc: 'Notificações sobre novas aulas e materiais nas trilhas.' },
                      { title: 'Mensagens da IA', desc: 'Insights proativos gerados pelo Lab AI.' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 hover:bg-cream-50 rounded-xl transition-colors">
                        <div className="max-w-[80%]">
                          <p className="font-bold text-brown-900 text-sm">{item.title}</p>
                          <p className="text-xs text-brown-800/50">{item.desc}</p>
                        </div>
                        <div className={`w-10 h-5 rounded-full relative cursor-pointer ${i < 2 ? 'bg-orange-500' : 'bg-cream-300'}`}>
                          <div className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm transition-all ${i < 2 ? 'right-1' : 'left-1'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
