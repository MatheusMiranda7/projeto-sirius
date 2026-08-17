'use client';

import Image from 'next/image';
import { useRef } from 'react';

import {
    motion,
    useScroll,
    useTransform,
} from 'motion/react';

export function CinematicHero() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    });

    /*
     * FOTOGRAFIA
     *
     * Começa muito próxima da imagem
     * e vai lentamente "abrindo a câmera".
     */
    const imageScale = useTransform(
        scrollYProgress,
        [0, 0.18, 0.55, 0.88],
        [1.28, 1.2, 1.09, 1.02]
    );

    const imageY = useTransform(
        scrollYProgress,
        [0, 0.5, 0.88],
        ['3%', '0%', '-3%']
    );

    /*
     * REVELAÇÃO DA IMAGEM
     *
     * Começa como uma fenda horizontal.
     */
    const imageClip = useTransform(
        scrollYProgress,
        [0, 0.06, 0.2, 0.3],
        [
            'inset(49% 0% 49% 0% round 999px)',
            'inset(46% 0% 46% 0% round 999px)',
            'inset(20% 0% 20% 0% round 32px)',
            'inset(0% 0% 0% 0% round 0px)',
        ]
    );

    /*
     * A imagem começa quase invisível
     * e ganha presença conforme é revelada.
     */
    const imageBrightness = useTransform(
        scrollYProgress,
        [0, 0.12, 0.3, 0.75],
        [0.25, 0.45, 0.78, 1]
    );

    /*
     * FEIXE DE LUZ
     */
    const beamX = useTransform(
        scrollYProgress,
        [0.03, 0.3],
        ['-45vw', '145vw']
    );

    const beamOpacity = useTransform(
        scrollYProgress,
        [0, 0.04, 0.18, 0.32],
        [0, 0.7, 0.45, 0]
    );

    /*
     * FRASE 1
     */
    const firstTextOpacity = useTransform(
        scrollYProgress,
        [0.25, 0.33, 0.45, 0.52],
        [0, 1, 1, 0]
    );

    const firstTextY = useTransform(
        scrollYProgress,
        [0.25, 0.35, 0.52],
        [40, 0, -20]
    );

    /*
     * FRASE 2
     */
    const secondTextOpacity = useTransform(
        scrollYProgress,
        [0.5, 0.59, 0.72, 0.8],
        [0, 1, 1, 0]
    );

    const secondTextY = useTransform(
        scrollYProgress,
        [0.5, 0.62, 0.8],
        [35, 0, -20]
    );

    /*
     * PROJECT SIRIUS
     */
    const siriusOpacity = useTransform(
        scrollYProgress,
        [0.72, 0.82, 0.9],
        [0, 1, 0]
    );

    /*
     * FADE FINAL
     *
     * A experiência volta para o preto antes
     * da parte comercial aparecer.
     */
    const finalBlack = useTransform(
        scrollYProgress,
        [0.87, 1],
        [0, 1]
    );

    return (
        <section
            ref={containerRef}
            className="relative h-[420vh] bg-black"
        >
            <div className="sticky top-0 h-[100svh] overflow-hidden bg-black">
                {/* IMAGEM CINEMATOGRÁFICA */}
                <motion.div
                    style={{
                        scale: imageScale,
                        y: imageY,
                        clipPath: imageClip,
                        opacity: imageBrightness,
                    }}
                    className="absolute inset-0"
                >
                    <Image
                        src="/images/experience/hero-desktop.jpg"
                        alt="Composição sofisticada de mesa"
                        fill
                        priority
                        sizes="100vw"
                        className="
              object-cover
              object-[55%_center]
              sm:object-center
            "
                    />
                </motion.div>

                {/* VINHETA */}
                <div
                    className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.22)_55%,rgba(0,0,0,0.85)_100%)]
          "
                />

                {/* FEIXE DE LUZ */}
                <motion.div
                    style={{
                        x: beamX,
                        opacity: beamOpacity,
                    }}
                    className="
            pointer-events-none
            absolute
            -top-[20%]
            left-0
            h-[140%]
            w-[18vw]
            min-w-[100px]
            rotate-[13deg]
            bg-gradient-to-r
            from-transparent
            via-[#fff5df]/35
            to-transparent
            blur-2xl
          "
                />

                {/* PRIMEIRA FRASE */}
                <motion.div
                    style={{
                        opacity: firstTextOpacity,
                        y: firstTextY,
                    }}
                    className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-6
          "
                >
                    <h1
                        className="
              max-w-5xl
              text-center
              text-4xl
              font-light
              leading-[0.98]
              tracking-[-0.045em]
              text-white
              sm:text-6xl
              lg:text-8xl
              xl:text-9xl
            "
                    >
                        A mesa não é
                        <br />
                        apenas um lugar.
                    </h1>
                </motion.div>

                {/* SEGUNDA FRASE */}
                <motion.div
                    style={{
                        opacity: secondTextOpacity,
                        y: secondTextY,
                    }}
                    className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-center
            justify-center
            px-6
          "
                >
                    <p
                        className="
              max-w-4xl
              text-center
              text-3xl
              font-light
              leading-[1.05]
              tracking-[-0.035em]
              text-white
              sm:text-5xl
              lg:text-7xl
            "
                    >
                        Ela é onde histórias começam.
                    </p>
                </motion.div>

                {/* ASSINATURA */}
                <motion.div
                    style={{
                        opacity: siriusOpacity,
                    }}
                    className="
            pointer-events-none
            absolute
            inset-0
            flex
            items-end
            justify-center
            pb-[12vh]
          "
                >
                    <span
                        className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.55em]
              text-white/60
              sm:text-xs
            "
                    >
                        Project Sirius
                    </span>
                </motion.div>

                {/* FADE FINAL */}
                <motion.div
                    style={{
                        opacity: finalBlack,
                    }}
                    className="pointer-events-none absolute inset-0 bg-black"
                />
            </div>
        </section>
    );
}