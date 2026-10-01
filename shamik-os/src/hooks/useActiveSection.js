import { useEffect, useState } from 'react';

export function useActiveSection(sectionIds) {
  const [active, setActive] = useState('home');

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      { rootMargin: '-18% 0px -58% 0px', threshold: [0.08, 0.2, 0.45] },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
