/**
 * @file 拖拽排序demo接口api文件
 * @author zhangwenxi(zhangwenxi@baidu.com)
 */

import axios, {AxiosResponse} from 'axios';
import {INTERFACE} from '../constants/url';
import {ISkillItemModel} from '../stores';

export function getSkillsApi(): Promise<AxiosResponse<IResBody<ISkillItemModel>>> {
    return axios.post(
        INTERFACE.SKILL.LIST,
        {
            botId: 1
        }
    );
}
