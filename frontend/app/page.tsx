"use client";

import Welcome from '@/components/home/welcome';
import BalancedLearning from '@/components/home/balanced';
import LiveAction from '@/components/home/liveAction';
import Quality from '@/components/home/quality';
import TestMonial from '@/components/home/testMonial';
import Team from '@/components/home/team';
import Subscribe from '@/components/home/subscribe';
import Footer from '@/components/home/footer';

export default function Home() {
    return (
        <>
            <Welcome></Welcome>
            <BalancedLearning></BalancedLearning>
            <LiveAction></LiveAction>
            <Quality></Quality>
            <TestMonial></TestMonial>
            <Team></Team>
            <Subscribe></Subscribe>
            <Footer></Footer>
        </>
    );
}
