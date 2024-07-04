const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const port = 3000;

app.get('/verificar-conta/:usuario', async (req, res) => {
    const usuario = req.params.usuario;

    // Iniciar o navegador Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    try {
        // Acessar a página de login
        await page.goto('https://trade.exnova.com/pt/login');

        // Preencher o formulário de login com o usuário fornecido
        await page.type('#username', usuario);

        // Clicar no botão de login
        await page.click('button[type="submit"]');

        // Esperar a página carregar após o login
        await page.waitForNavigation();

        // Verificar se o login foi bem-sucedido
        const loginSucesso = !page.url().includes('/login'); // Se a URL mudou após o login, o usuário existe

        // Retornar o resultado da verificação
        res.json({ usuario, temConta: loginSucesso });
    } catch (error) {
        console.error('Erro ao verificar conta:', error);
        res.status(500).json({ error: 'Erro ao verificar conta' });
    } finally {
        // Fechar o navegador após a verificação
        await browser.close();
    }
});

app.listen(port, () => {
    console.log(`API de verificação de conta rodando em http://localhost:${300}`);
});
