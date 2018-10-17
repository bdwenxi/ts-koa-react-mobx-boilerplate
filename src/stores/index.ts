/**
 * @file 拖拽排序demo状态管理主文件
 * @author simmons8616(simmons0616@gmail.com)
 */

import {types, flow, cast, Instance} from 'mobx-state-tree';
import {DropResult} from 'react-beautiful-dnd';

import {getSkillsApi} from '../api';

const SkillItemModel = types.model(
    {
        skillId: types.identifier,
        skillName: types.optional(types.string, ''),
        priority: types.optional(types.number, 1)
    }
);

type ISkillItemModelType = Instance<typeof SkillItemModel>;
export interface ISkillItemModel extends ISkillItemModelType {}

const DragSortModel = types.model(
    {
        skills: types.optional(types.array(SkillItemModel), [])
    }
).views(
    self => ({
        get hasSkill() {
            return self.skills.length > 0;
        }
    })
).actions(
    self => ({
        getSkills: flow(function* () {
            try {
                const res = yield getSkillsApi();
                const {
                    errno,
                    errorMsg,
                    result
                } = res.data;

                if (errno) {
                    console.log(errorMsg);
                    return;
                }

                self.skills = result;
            }
            catch (e) {
                console.log(e);
            }
        }),
        onSkillDragEnd(result: DropResult) {
            // 没有拖拽到终点的时候，禁止以下操作
            if (!result.destination) {
                return;
            }

            const startIndex = result.source.index;
            const endIndex = result.destination.index;
            const skills = self.skills.slice().map(skill => ({...skill}));
            const [removed] = skills.splice(startIndex, 1);
            skills.splice(endIndex, 0, removed);

            self.skills = cast(skills);
        }
    })
);

type IDragSortModelType = Instance<typeof DragSortModel>;
export interface IDragSortModel extends IDragSortModelType {}
export default DragSortModel;
