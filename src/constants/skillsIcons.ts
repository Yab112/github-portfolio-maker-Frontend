import { IconType } from 'react-icons';
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaRust, FaPhp, FaSwift, FaVuejs, FaAngular,
  FaAws, FaDocker, FaGithub, FaJenkins, 
} from 'react-icons/fa';

import {
  SiJavascript, SiTypescript, SiCplusplus, SiGo, SiKotlin,
  SiTensorflow, SiPytorch, SiMongodb, SiPostgresql, SiMysql, SiGraphql,
 SiVite, SiRedux, SiSass, SiTailwindcss, SiWebpack, SiBabel,
  SiElectron, SiNextdotjs, SiNuxtdotjs, SiDjango, SiFastapi, SiFlask, SiSpringboot,
  SiNestjs, SiRabbitmq, SiRedis, SiTerraform, SiAnsible, SiPrometheus, SiGrafana,
  SiKubernetes, SiBitbucket, SiUnity, SiUnrealengine
} from 'react-icons/si';

// Define the skill structure
export interface Skill {
  name: string;
  icon: IconType;
}

// Skills categories mapped correctly
export const skillsData: Record<string, Skill[]> = {
  'Programming Languages': [
    { name: 'JavaScript', icon: SiJavascript },
    { name: 'TypeScript', icon: SiTypescript },
    { name: 'Python', icon: FaPython },
    { name: 'Java', icon: FaJava },
    { name: 'C++', icon: SiCplusplus },
    { name: 'Go', icon: SiGo },
    { name: 'Rust', icon: FaRust },
    { name: 'PHP', icon: FaPhp },
    { name: 'Swift', icon: FaSwift },
    { name: 'Kotlin', icon: SiKotlin },
  ],
  'Frontend Dev': [
    { name: 'React', icon: FaReact },
    { name: 'Vue.js', icon: FaVuejs },
    { name: 'Angular', icon: FaAngular },
    { name: 'Redux', icon: SiRedux },
    { name: 'Sass', icon: SiSass },
    { name: 'Tailwind CSS', icon: SiTailwindcss },
    { name: 'Vite', icon: SiVite },
    { name: 'Webpack', icon: SiWebpack },
    { name: 'Babel', icon: SiBabel },
    { name: 'Electron', icon: SiElectron },
    { name: 'Next.js', icon: SiNextdotjs },
    { name: 'Nuxt.js', icon: SiNuxtdotjs },
  ],
  'Backend Dev': [
    { name: 'Node.js', icon: FaNodeJs },
    { name: 'Django', icon: SiDjango },
    { name: 'FastAPI', icon: SiFastapi },
    { name: 'Flask', icon: SiFlask },
    { name: 'Spring Boot', icon: SiSpringboot },
    { name: 'NestJS', icon: SiNestjs },
    { name: 'RabbitMQ', icon: SiRabbitmq },
    { name: 'Redis', icon: SiRedis },
  ],
  'Databases': [
    { name: 'MongoDB', icon: SiMongodb },
    { name: 'PostgreSQL', icon: SiPostgresql },
    { name: 'MySQL', icon: SiMysql },
    { name: 'GraphQL', icon: SiGraphql },
  ],
  'AI/ML': [
    { name: 'TensorFlow', icon: SiTensorflow },
    { name: 'PyTorch', icon: SiPytorch },
  ],
  'DevOps': [
    { name: 'AWS', icon: FaAws },
    { name: 'Docker', icon: FaDocker },
    { name: 'Terraform', icon: SiTerraform },
    { name: 'Ansible', icon: SiAnsible },
    { name: 'Prometheus', icon: SiPrometheus },
    { name: 'Grafana', icon: SiGrafana },
    { name: 'Kubernetes', icon: SiKubernetes },
    { name: 'Jenkins', icon: FaJenkins },
    { name: 'GitHub Actions', icon: FaGithub },
    { name: 'Bitbucket', icon: SiBitbucket },
  ],
  'Game Engines': [
    { name: 'Unity', icon: SiUnity },
    { name: 'Unreal Engine', icon: SiUnrealengine },
  ],
};
