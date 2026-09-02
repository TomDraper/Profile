import { useInView } from "react-intersection-observer";

export function useFadeInView(additionalClassNames:string) {
    const [ref, inView] = useInView({
        root: null,
        rootMargin: "0%",
        threshold: 0.5,
        initialInView: true
    });

    const className = additionalClassNames + ` ${inView ? "fade inView" : "fade"}`;

    return { ref, className, inView };
}