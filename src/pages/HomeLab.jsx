import React, { useState, useEffect } from 'react';
// Import des icônes
import { FaServer, FaNetworkWired, FaDatabase, FaLock, FaShieldAlt, FaCogs, FaCode, FaDocker } from 'react-icons/fa';
import { SiProxmox, SiNginx, SiPostgresql, SiMongodb, SiRedis, SiGrafana, SiInfluxdb, SiKubernetes, SiAnsible, SiPfsense, SiGithubactions } from 'react-icons/si';

// Ces images sont à placer dans le dossier src/assets/images
// Vous pouvez remplacer ces imports par vos propres images
const serverRackImage = 'https://www.45drives.com/img/products/S45-headon.jpg';
const proxmoxDashboard = 'https://pve.proxmox.com/mediawiki/images/8/85/Nossl2.png';
const networkDiagram = 'https://i.stack.imgur.com/Y4Kfw.png';
const monitoringDashboard = 'https://grafana.com/api/dashboards/1860/images/7994/image';

function HomeLab() {
  const [visibleSection, setVisibleSection] = useState(0);
  
  useEffect(() => {
    // Animation séquentielle des sections
    const timer = setInterval(() => {
      setVisibleSection(prev => {
        if (prev < 4) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 300);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        <FaServer className="text-blue-500 mr-3" />
        Mon Infrastructure HomeLAB
      </h1>
      
      <section className={`mb-8 transition-all duration-700 ${visibleSection >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaCogs className="mr-2 text-blue-500" /> Vue d'ensemble
        </h2>
        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="md:w-1/2">
            <p className="mb-4">
              Mon HomeLAB est un environnement complet d'infrastructure informatique que j'ai conçu et développé
              pour expérimenter, apprendre et héberger mes services personnels. Il combine virtualisation,
              conteneurisation, sécurité et automatisation.
            </p>
          </div>
          <div className="md:w-1/2">
            <img 
              src={serverRackImage} 
              alt="Server Rack" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
            <p className="text-sm text-center mt-2 text-gray-600">Mon rack de serveurs</p>
          </div>
        </div>
      </section>

      <section className={`mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6 transition-all duration-700 ${visibleSection >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="bg-base-100 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-3 text-blue-600 flex items-center">
            <SiProxmox className="mr-2 text-2xl" /> 
            Virtualisation avec Proxmox
          </h2>
          <div className="mb-4">
            <img 
              src={proxmoxDashboard} 
              alt="Proxmox Dashboard" 
              className="w-full h-auto rounded-lg shadow mb-3" 
            />
          </div>
          <p className="mb-3">
            Au cœur de mon infrastructure se trouve Proxmox VE, qui me permet de:
          </p>
          <ul className="list-disc pl-5 mb-3">
            <li>Gérer efficacement mes ressources matérielles</li>
            <li>Créer et gérer des machines virtuelles et des conteneurs LXC</li>
            <li>Mettre en place des clusters haute disponibilité</li>
            <li>Réaliser des snapshots et des backups automatisés</li>
          </ul>
          <p>J'utilise cette plateforme pour isoler mes différents services et faciliter la maintenance.</p>
        </div>

        <div className="bg-base-100 p-5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold mb-3 text-green-600 flex items-center">
            <SiNginx className="mr-2 text-2xl" /> 
            Reverse Proxy
          </h2>
          <div className="mb-4 flex justify-center">
            <div className="flex flex-wrap gap-4 justify-center mb-3">
              <SiNginx className="text-5xl text-green-600" />
              <img src="https://letsencrypt.org/images/le-logo-standard.png" alt="Let's Encrypt" className="h-12" />
            </div>
          </div>
          <p className="mb-3">
            J'ai mis en place un reverse proxy avec:
          </p>
          <ul className="list-disc pl-5 mb-3">
            <li>Nginx pour la gestion du trafic HTTP/HTTPS</li>
            <li>Génération automatique des certificats SSL avec Let's Encrypt</li>
            <li>Protection contre les attaques DDoS et injections</li>
            <li>Load balancing et répartition de charge</li>
          </ul>
          <p>Cette configuration me permet d'exposer mes services en toute sécurité et de centraliser les accès.</p>
        </div>
      </section>

      <section className={`mb-8 transition-all duration-700 ${visibleSection >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaNetworkWired className="mr-2 text-purple-600" /> 
          Infrastructure réseau
        </h2>
        <div className="bg-base-100 p-5 rounded-lg shadow-lg mb-6">
          <div className="mb-4">
            <img 
              src={networkDiagram} 
              alt="Network Diagram" 
              className="w-full h-auto rounded-lg shadow-lg" 
            />
            <p className="text-sm text-center mt-2 text-gray-600">Schéma de mon infrastructure réseau</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className=" p-4 rounded-lg flex flex-col items-center">
              <SiPfsense className="text-4xl text-orange-500 mb-2" />
              <h3 className="font-semibold text-center">pfSense Firewall</h3>
              <p className="text-sm text-center">Protection périmétrique et VPN</p>
            </div>
            <div className=" p-4 rounded-lg flex flex-col items-center">
              <FaNetworkWired className="text-4xl text-blue-500 mb-2" />
              <h3 className="font-semibold text-center">VLANs</h3>
              <p className="text-sm text-center">Segmentation du réseau</p>
            </div>
            <div className=" p-4 rounded-lg flex flex-col items-center">
              <FaShieldAlt className="text-4xl text-red-500 mb-2" />
              <h3 className="font-semibold text-center">IDS/IPS</h3>
              <p className="text-sm text-center">Détection et prévention d'intrusions</p>
            </div>
          </div>
        </div>
      </section>

      <section className={`mb-8 transition-all duration-700 ${visibleSection >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaDatabase className="mr-2 text-amber-600" /> 
          Bases de Données & Monitoring
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-base-100 p-5 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <FaDatabase className="mr-2" /> 
              Bases de Données
            </h3>
            <div className="flex justify-around mb-4">
              <div className="flex flex-col items-center">
                <SiPostgresql className="text-5xl text-blue-800" />
                <span className="mt-1 text-sm">PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center">
                <SiMongodb className="text-5xl text-green-500" />
                <span className="mt-1 text-sm">MongoDB</span>
              </div>
              <div className="flex flex-col items-center">
                <SiRedis className="text-5xl text-red-500" />
                <span className="mt-1 text-sm">Redis</span>
              </div>
              <div className="flex flex-col items-center">
                <SiInfluxdb className="text-5xl text-purple-400" />
                <span className="mt-1 text-sm">InfluxDB</span>
              </div>
            </div>
            <p>Chaque technologie est choisie en fonction des besoins spécifiques de mes applications.</p>
          </div>
          
          <div className="bg-base-100 p-5 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <SiGrafana className="mr-2 text-orange-500" /> 
              Monitoring
            </h3>
            <div className="mb-4">
              <img 
                src={monitoringDashboard} 
                alt="Grafana Dashboard" 
                className="w-full h-auto rounded-lg shadow" 
              />
            </div>
            <p>Une surveillance complète avec des alertes automatisées pour assurer le bon fonctionnement de l'infrastructure.</p>
          </div>
        </div>
      </section>

      <section className={`mb-8 transition-all duration-700 ${visibleSection >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-2xl font-semibold mb-4 flex items-center">
          <FaCode className="mr-2 text-blue-600" />
          DevOps & Automatisation
        </h2>
        <div className="bg-base-100 p-5 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="flex flex-col items-center">
              <FaDocker className="text-5xl text-blue-500" />
              <span className="mt-2">Docker</span>
            </div>
            <div className="flex flex-col items-center">
              <SiKubernetes className="text-5xl text-blue-600" />
              <span className="mt-2">Kubernetes</span>
            </div>
            <div className="flex flex-col items-center">
              <SiAnsible className="text-5xl text-red-600" />
              <span className="mt-2">Ansible</span>
            </div>
            <div className="flex flex-col items-center">
              <SiGithubactions className="text-5xl text-gray-800" />
              <span className="mt-2">CI/CD</span>
            </div>
          </div>
          <p className="mb-4">
            L'automatisation est au cœur de mon HomeLAB. J'utilise ces outils pour déployer de nouveaux services,
            mettre à jour les configurations et maintenir un environnement stable et reproductible.
          </p>
        </div>
      </section>
    </div>
  );
}

export default HomeLab;
