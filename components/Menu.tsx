'use client';

/**
 * 🎯 MENU SECTION - Tab-uri categorii + Grid produse cu imagini
 */

import { useState, useEffect } from 'react';

const menuData = {
  Espresso: [
    { name: 'Espresso', price: 18, description: 'Shot dublu de espresso intens', image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=600&auto=format&fit=crop' },
    { name: 'Americano', price: 20, description: 'Espresso diluat cu apă caldă', image: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop' },
    { name: 'Cappuccino', price: 22, description: 'Espresso cu lapte spumat', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
    { name: 'Flat White', price: 23, description: 'Microfoam mătăsos peste espresso', image: '/flat_white.jpg' },
    { name: 'Latte', price: 23, description: 'Espresso cu lapte abundent', image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=600&auto=format&fit=crop' },
    { name: 'Macchiato', price: 19, description: 'Espresso cu o notă de lapte spumat', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop' },
    { name: 'Cortado', price: 21, description: 'Espresso tăiat cu lapte cald în proporție egală', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop' },
    { name: 'Ristretto', price: 18, description: 'Extract concentrat, mai scurt și mai intens decât espresso', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop' },
  ],
  Specialty: [
    { name: 'Pour Over', price: 28, description: 'Extracție manuală lentă, aromă complexă', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { name: 'AeroPress', price: 26, description: 'Presiune controlată pentru un gust curat', image: 'https://images.unsplash.com/photo-1516743619420-154b70a65fea?w=600&auto=format&fit=crop' },
    { name: 'Chemex', price: 30, description: 'Filtru de hârtie gros, claritate maximă', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop' },
    { name: 'Syphon', price: 34, description: 'Cafea preparată prin vacuum, spectaculoasă', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop' },
    { name: 'Cold Drip', price: 32, description: 'Picurare lentă la rece, 12 ore', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { name: 'Turkish Coffee', price: 20, description: 'Cafea fiartă tradițional în ibric, cu cardamom', image: 'https://images.unsplash.com/photo-1578374173705-969cbe6f2d6b?w=600&auto=format&fit=crop' },
    { name: 'V60', price: 29, description: 'Filter japonez în formă de con, extracție precisă și curată', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop' },
    { name: 'Espresso Tonic', price: 25, description: 'Shot de espresso peste apă tonică cu gheață — răcoritor și energizant', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 24, description: 'Infuzat 18 ore la rece, bogat și neted', image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Tonic', price: 27, description: 'Cold brew cu apă tonică și lămâie', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop' },
    { name: 'Nitro Cold Brew', price: 29, description: 'Infuzat cu azot, textură cremoasă', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Latte', price: 26, description: 'Cold brew cu lapte de ovăz', image: 'https://images.unsplash.com/photo-1592663527359-cf6642f54cff?w=600&auto=format&fit=crop' },
    { name: 'Iced Americano', price: 21, description: 'Espresso dublu peste gheață și apă rece', image: 'https://images.unsplash.com/photo-1587314168485-3236d6710814?w=600&auto=format&fit=crop' },
    { name: 'Iced Latte', price: 24, description: 'Espresso cu lapte rece și gheață', image: 'https://images.unsplash.com/photo-1568649929103-28ffbefaca1e?w=600&auto=format&fit=crop' },
  ],
  Ceai: [
    { name: 'Matcha Latte', price: 24, description: 'Matcha ceremonial japonez cu lapte de ovăz, cremos și delicat', image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&auto=format&fit=crop' },
    { name: 'Chai Latte', price: 22, description: 'Amestec de condimente calde — scorțișoară, cardamom, ghimbir — cu lapte spumat', image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=600&auto=format&fit=crop' },
    { name: 'Earl Grey', price: 20, description: 'Ceai negru aromat cu bergamotă, servit cu felie de lămâie', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
    { name: 'Sencha Iced Tea', price: 21, description: 'Ceai verde japonez infuzat la rece, proaspăt și ușor astringent', image: 'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=600&auto=format&fit=crop' },
  ],
  Patiserie: [
    { name: 'Croissant Simplu', price: 18, description: 'Foietaj franțuzesc, unt de calitate', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
    { name: 'Croissant Migdale', price: 21, description: 'Umplut cu cremă frangipane', image: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?w=600&auto=format&fit=crop' },
    { name: 'Pain au Chocolat', price: 20, description: 'Croissant cu ciocolată neagră belgiană', image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=600&auto=format&fit=crop' },
    { name: 'Brioche', price: 19, description: 'Pufoasă, cu unt și vanilie bourbon', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=600&auto=format&fit=crop' },
    { name: 'Tart Fructe', price: 24, description: 'Cremă de vanilie și fructe de sezon', image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&auto=format&fit=crop' },
    { name: 'Eclair Caramel', price: 22, description: 'Choux cu cremă caramel și glazură', image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&auto=format&fit=crop' },
  ],
};

type Category = keyof typeof menuData;
const categories = Object.keys(menuData) as Category[];

export default function Menu() {
  const [activeTab, setActiveTab] = useState<Category>('Espresso');
  const [visible, setVisible] = useState(true);

  const handleTabChange = (cat: Category) => {
    if (cat === activeTab) return;
    setVisible(false);
    setTimeout(() => {
      setActiveTab(cat);
      setVisible(true);
    }, 200);
  };

  return (
    <section id="menu" className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* TITLU SECȚIUNE */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Meniul Nostru
          </h2>
          <p className="text-gray-500" style={{ fontSize: '1.5rem' }}>
            Preparate cu pasiune, servite cu drag
          </p>
        </div>

        {/* TAB-URI CATEGORII */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleTabChange(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-[#d5996b] text-white shadow-md scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE */}
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 transition-all duration-200"
          style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(8px)' }}
        >
          {menuData[activeTab].map((item) => (
            <div
              key={item.name}
              className="group rounded-2xl overflow-hidden hover:scale-[1.02] transition-all duration-300 flex flex-col"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.18)'; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'; }}
              style={{ backgroundColor: '#ffeddf' }}
            >
              {/* IMAGINE - aspect ratio 4:3 */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>

              {/* TEXT */}
              <div className="p-6 flex flex-col flex-1" style={{ minHeight: '130px' }}>
                <h3 className="font-bold mb-1" style={{ color: '#3b1f0e', fontSize: '1.875rem' }}>
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#3b1f0e', opacity: 0.7 }}>
                  {item.description}
                </p>
                <div className="mt-auto pt-3 flex justify-end">
                  <span className="font-bold" style={{ color: '#3b1f0e', fontSize: '1.875rem' }}>
                    {item.price} RON
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
