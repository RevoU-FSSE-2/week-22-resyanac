import { Card as CardComponents } from 'antd';
import { ReactNode } from 'react';

interface Props {
    title?: string;
    children: ReactNode;
}

const Card = ({ title, children }: Props) => {
    return (
        <>
            <CardComponents className='card' title={title} bordered={true} style={{ width: 800}}>
                {children}
            </CardComponents>
        </>
    )
};

export default Card;