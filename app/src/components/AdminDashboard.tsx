import { useState } from 'react';
import { 
  Home, 
  LogOut, 
  Plus, 
  Edit2, 
  Trash2, 
  MapPin, 
  Phone, 
  Mail, 
  Save,
  X,
  Image as ImageIcon
} from 'lucide-react';
import { propertyShowcaseConfig, regionCarouselConfig } from '../config';

interface Property {
  id: string;
  name: string;
  subtitle: string;
  location: string;
  image: string;
  type: string;
  description: string;
  surface: string;
  accessibility: string;
  potential: string;
}

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'properties' | 'regions' | 'settings'>('properties');
  const [properties, setProperties] = useState<Property[]>(propertyShowcaseConfig.properties);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSaveProperty = (property: Property) => {
    if (isAddingNew) {
      setProperties([...properties, { ...property, id: `prop-${Date.now()}` }]);
    } else {
      setProperties(properties.map(p => p.id === property.id ? property : p));
    }
    setEditingProperty(null);
    setIsAddingNew(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleDeleteProperty = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce terrain ?')) {
      setProperties(properties.filter(p => p.id !== id));
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
    setEditingProperty({
      id: '',
      name: '',
      subtitle: '',
      location: '',
      image: '/images/hero-farmland.jpg',
      type: 'Agricultural',
      description: '',
      surface: '',
      accessibility: '',
      potential: '',
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F17]">
      {/* Header */}
      <header className="bg-white/5 border-b border-white/10">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-[#D4A14C] flex items-center justify-center">
                <Home className="w-5 h-5 text-[#D4A14C]" />
              </div>
              <div>
                <h1 className="font-serif text-xl text-white">SH Real Estate</h1>
                <p className="text-white/50 text-xs">Administration</p>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-white/70 hover:text-white hover:bg-white/5 rounded-sm transition-all"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/5 border-b border-white/10">
        <div className="container-custom">
          <div className="flex gap-1">
            {[
              { id: 'properties', label: 'Terrains', icon: MapPin },
              { id: 'regions', label: 'Régions', icon: MapPin },
              { id: 'settings', label: 'Paramètres', icon: Edit2 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? 'text-[#D4A14C] border-b-2 border-[#D4A14C]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container-custom py-8">
        {/* Success message */}
        {showSuccess && (
          <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-sm flex items-center gap-3">
            <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <Save className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-green-400">Modifications enregistrées avec succès !</p>
          </div>
        )}

        {activeTab === 'properties' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-serif text-2xl text-white">Gestion des terrains</h2>
              <button
                onClick={handleAddNew}
                className="flex items-center gap-2 px-4 py-2 bg-[#D4A14C] text-[#0B0F17] rounded-sm font-medium hover:bg-[#e5b55d] transition-colors"
              >
                <Plus className="w-4 h-4" />
                Ajouter un terrain
              </button>
            </div>

            {/* Properties List */}
            <div className="grid gap-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className="bg-white/5 border border-white/10 rounded-sm p-4 hover:border-[#D4A14C]/30 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-16 rounded-sm overflow-hidden flex-shrink-0">
                      <img
                        src={property.image}
                        alt={property.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-serif text-lg text-white">{property.name}</h3>
                          <p className="text-white/60 text-sm">{property.subtitle}</p>
                          <div className="flex items-center gap-4 mt-2">
                            <span className="text-[#D4A14C] text-xs uppercase tracking-wider">{property.type}</span>
                            <span className="text-white/40 text-xs">{property.location}</span>
                            <span className="text-white/40 text-xs">{property.surface}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingProperty(property);
                              setIsAddingNew(false);
                            }}
                            className="w-8 h-8 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-white/60 hover:text-[#D4A14C] hover:border-[#D4A14C]/50 transition-all"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="w-8 h-8 bg-white/5 border border-white/10 rounded-sm flex items-center justify-center text-white/60 hover:text-red-400 hover:border-red-400/50 transition-all"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'regions' && (
          <div>
            <h2 className="font-serif text-2xl text-white mb-6">Régions couvertes</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {regionCarouselConfig.slides.map((region, index) => (
                <div
                  key={index}
                  className="bg-white/5 border border-white/10 rounded-sm overflow-hidden"
                >
                  <div className="aspect-video">
                    <img
                      src={region.image}
                      alt={region.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-serif text-xl text-white mb-1">{region.title}</h3>
                    <p className="text-white/60 text-sm mb-2">{region.subtitle}</p>
                    <p className="text-[#D4A14C] text-sm">{region.area} {region.unit}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div>
            <h2 className="font-serif text-2xl text-white mb-6">Paramètres</h2>
            <div className="bg-white/5 border border-white/10 rounded-sm p-6 max-w-lg">
              <h3 className="text-white font-medium mb-4">Informations de contact</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-4 h-4 text-[#D4A14C]" />
                  <span>+212 631-800376</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-4 h-4 text-[#D4A14C]" />
                  <span>contact@sh-realestate.ma</span>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-4 h-4 text-[#D4A14C]" />
                  <span>Rabat, Morocco</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Modal */}
      {editingProperty && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B0F17] border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6 border-b border-white/10 flex items-center justify-between">
              <h3 className="font-serif text-xl text-white">
                {isAddingNew ? 'Ajouter un terrain' : 'Modifier le terrain'}
              </h3>
              <button
                onClick={() => {
                  setEditingProperty(null);
                  setIsAddingNew(false);
                }}
                className="w-8 h-8 bg-white/5 rounded-sm flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Nom</label>
                  <input
                    type="text"
                    value={editingProperty.name}
                    onChange={(e) => setEditingProperty({ ...editingProperty, name: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Sous-titre</label>
                  <input
                    type="text"
                    value={editingProperty.subtitle}
                    onChange={(e) => setEditingProperty({ ...editingProperty, subtitle: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Localisation</label>
                  <input
                    type="text"
                    value={editingProperty.location}
                    onChange={(e) => setEditingProperty({ ...editingProperty, location: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Type</label>
                  <select
                    value={editingProperty.type}
                    onChange={(e) => setEditingProperty({ ...editingProperty, type: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  >
                    <option value="Agricultural">Agricultural</option>
                    <option value="Construction">Construction</option>
                    <option value="Mixed-Use">Mixed-Use</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Description</label>
                <textarea
                  value={editingProperty.description}
                  onChange={(e) => setEditingProperty({ ...editingProperty, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C] resize-none"
                />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Surface</label>
                  <input
                    type="text"
                    value={editingProperty.surface}
                    onChange={(e) => setEditingProperty({ ...editingProperty, surface: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Accessibilité</label>
                  <input
                    type="text"
                    value={editingProperty.accessibility}
                    onChange={(e) => setEditingProperty({ ...editingProperty, accessibility: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Potentiel</label>
                  <input
                    type="text"
                    value={editingProperty.potential}
                    onChange={(e) => setEditingProperty({ ...editingProperty, potential: e.target.value })}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white focus:outline-none focus:border-[#D4A14C]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-20 rounded-sm overflow-hidden">
                    <img
                      src={editingProperty.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/20 rounded-sm text-white/60 hover:text-white hover:border-[#D4A14C]/50 transition-all">
                    <ImageIcon className="w-4 h-4" />
                    Changer l'image
                  </button>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => {
                  setEditingProperty(null);
                  setIsAddingNew(false);
                }}
                className="px-6 py-2 text-white/60 hover:text-white transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={() => handleSaveProperty(editingProperty)}
                className="flex items-center gap-2 px-6 py-2 bg-[#D4A14C] text-[#0B0F17] rounded-sm font-medium hover:bg-[#e5b55d] transition-colors"
              >
                <Save className="w-4 h-4" />
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
