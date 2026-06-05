import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  url?: string;
}

export function SEO({ title, description, url = "https://nullryns.com" }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | Nullryns (Øryns)`;
    document.title = fullTitle;
    
    const setMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('description', description);
    setMetaTag('og:title', fullTitle, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:url', url, true);
    setMetaTag('og:type', 'website', true);
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', fullTitle);
    setMetaTag('twitter:description', description);
  }, [title, description, url]);

  return null;
}
