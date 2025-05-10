import { useEffect, useState } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Project = {
  url: string;
  projectName: string;
  category: string;
  languages: string[];
  image?: string;
};

export default function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  /* JSON’dan projeleri çek */
  useEffect(() => {
    fetch("/projects.json")
        .then(r => r.json())
        .then(setProjects)
        .catch(err => console.error("projects.json okunamadı:", err))
        .finally(() => setLoading(false));
  }, []);

  /* GSAP animasyonu (projeler gelince hesaplanır) */
  useGSAP(
      () => {
        const boxes = document.querySelectorAll<HTMLElement>(".work-box");
        if (!boxes.length) return;

        const boxW = boxes[0].offsetWidth;
        const translateX =
            boxW * boxes.length -
            boxes[0].parentElement!.clientWidth +
            parseInt(getComputedStyle(boxes[0]).paddingLeft || "0", 10);

        gsap.fromTo(
            ".work-flex",
            { x: 0 },
            {
              x: -translateX,
              ease: "none",
              scrollTrigger: {
                trigger: ".work-section",
                start: "top top",
                end: "bottom top",
                scrub: true,
                pin: true,
                pinType: !ScrollTrigger.isTouch ? "transform" : "fixed",
                id: "work"
              }
            }
        );
      },
      [projects] // projeler değiştiğinde yeniden kur
  );

  return (
      <section className="work-section" id="work">
        <div className="work-container section-container">
          <h2>
            My <span>Work</span>
          </h2>

          <div className="work-flex">
            {loading && <p className="loading-text">Loading…</p>}

            {projects.map((p, i) => (
                <div className="work-box" key={i}>
                  <div className="work-info">
                    <div className="work-title">
                      <h3>{String(i + 1).padStart(2, "0")}</h3>
                      <div>
                        <h4>{p.projectName}</h4>
                        <p>{p.category}</p>
                      </div>
                    </div>

                    <h4>Languages / Tools</h4>
                    <p>{p.languages.join(", ")}</p>

                    <a
                        className="repo-link"
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                    >
                      View project →
                    </a>
                  </div>

                  <WorkImage
                      image={p.image || "/images/placeholder.jpg"}
                      alt={p.projectName}
                  />
                </div>
            ))}
          </div>
        </div>
      </section>
  );
}
