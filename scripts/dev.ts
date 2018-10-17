/**
 * @file 本地服务启动脚本
 * @author simmons8616(simmons0616@gmail.com)
 */

import inquirer, {Answers} from 'inquirer';

const prompt = inquirer.createPromptModule();

async function getPromptAnswers() {
    let answers: Answers = {};
    const questions = [
        {
            type: 'input',
            name: 'port',
            message: '请输入本地服务需要部署的端口号',
            default: '8886',
            validate(input: string) {
                return !!input && input.length === 4;
            }
        }
    ];

    try {
        answers = await prompt(questions);
    }
    catch (e) {
        return Promise.reject(e);
    }

    return Promise.resolve(answers);
}

async function startDev() {
    let answers: Answers = {};

    try {
        answers = await getPromptAnswers();
    }
    catch (e) {
        console.log(e);
    }

    const port = answers.port;

    try {
        const appModule = require('../server/app').default || require('../server/app');
        const startServer = await appModule;

        startServer(
            port,
            () => console.log(`本地服务于${port}端口启动`)
        );
    }
    catch (e) {
        console.log(e);
    }
}

// 启动本地服务
startDev();
