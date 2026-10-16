import avatar from '../assets/images/avatar.png';
import projectLogo from '../assets/images/quemtanaquadra.png';
import resume from '../assets/files/Isabela Targino Miranda Alexandre.pdf?url';

export const profile = { name: 'Isabela Targino', email: 'isabelatargino89@gmail.com', github: 'https://github.com/targinobela', linkedin: 'https://www.linkedin.com/in/isabelatargino/', resume, avatar };
export const projects = [{ name: 'Quem Tá na Quadra?', url: 'https://quem-ta-na-quadra.vercel.app/', description: 'Um jogo diário de adivinhação em que o jogador tem seis tentativas para descobrir um atleta de vôlei por meio de uma fotografia que fica progressivamente menos pixelada a cada tentativa. Desenvolvido com React, TypeScript e Vite, com estatísticas de desempenho e desafios diários.', logo: projectLogo, screenshot: '', source: '' }];
export const experience = [ { company: 'Amazon Brasil', role: 'Tech Apprentice', period: 'jun. 2025 — set. 2026', details: ['Desenvolvimento de plataforma interna de recrutamento.', 'Backend serverless com Java e AWS Lambda; persistência com DynamoDB.', 'Infraestrutura como Código com CloudFormation.', 'Frontend com React, JavaScript e Vite.', 'CI/CD, documentação técnica e colaboração com equipe.'] }, { company: 'Gosth Services', role: 'Atendimento ao cliente', period: 'jun. 2024 — nov. 2024', details: ['Comunicação, organização e resolução de problemas no atendimento ao cliente.'] } ];
export const skills = { Linguagens: ['Java', 'JavaScript', 'Python', 'C'], Frontend: ['React', 'Vite', 'HTML', 'CSS', 'Tailwind CSS'], 'Cloud e Backend': ['AWS Lambda', 'DynamoDB', 'CloudFormation', 'PostgreSQL', 'MySQL'], Práticas: ['Git', 'CI/CD', 'Code Review', 'Documentação técnica', 'Metodologias ágeis'] };

