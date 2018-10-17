/**
 * @file 拖拽排序demo主入口文件
 * @author zhangwenxi@baidu.com
 */

import React from 'react';
import {observer} from 'mobx-react';
import classnames from 'classnames';
import {
    DragDropContext,
    Droppable,
    Draggable,
    DroppableProvided,
    DroppableStateSnapshot,
} from 'react-beautiful-dnd';

import DragSortMode, {IDragSortModel, ISkillItemModel} from '../stores';

import '../scss';

interface IDragDropAppProps {
    store: IDragSortModel,
    provided: DroppableProvided,
    snapshot: DroppableStateSnapshot
}

@observer
class DragDropApp extends React.Component<IDragDropAppProps, {}> {

    render() {
        const {provided, snapshot, store} = this.props;

        const dragSortInnerCls = classnames(
            'drag-sort-demo-inner',
            {
                'is-drag-over': snapshot.isDraggingOver
            }
        );

        return (
            <div ref={provided.innerRef}
                 className={dragSortInnerCls}>
                {
                    store.skills.map(
                        (skill: ISkillItemModel, index: number) => {
                            return (
                                <Draggable key={skill.skillId}
                                           draggableId={skill.skillId}
                                           index={index}>
                                    {
                                        (provided, snapshot) => {
                                            const cardCls = classnames(
                                                'drag-sort-demo-card',
                                                {
                                                    'is-dragging': snapshot.isDragging
                                                }
                                            );

                                            return (
                                                <div ref={provided.innerRef}
                                                     {...provided.draggableProps}
                                                     {...provided.dragHandleProps}
                                                     className={cardCls}>
                                                    {skill.skillName}
                                                </div>
                                            );
                                        }
                                    }
                                </Draggable>
                            );
                        }
                    )
                }
                {provided.placeholder}
            </div>
        );
    }
}

interface IAppContainerProps {}

@observer
export default class AppContainer extends React.Component<IAppContainerProps, {}> {
    store: IDragSortModel;

    constructor(props: IAppContainerProps) {
        super(props);

        this.store = DragSortMode.create();
        this.store.getSkills();
    }

    render() {
        const {hasSkill, onSkillDragEnd} = this.store;

        if (!hasSkill) {
            return null;
        }

        return (
            <div className="drag-sort-demo">
                <DragDropContext onDragEnd={onSkillDragEnd}>
                    <Droppable droppableId="droppable">
                        {
                            (provided, snapshot) => (
                                <DragDropApp store={this.store}
                                             provided={provided}
                                             snapshot={snapshot} />
                            )
                        }
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}
