/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Linkedin, Facebook, Instagram, Twitter } from 'lucide-react';
import { memo } from 'react';

interface FooterProps {
  t: Record<string, string>;
}

export default memo(function Footer({ t }: FooterProps) {
  const socialLinks = [
    { name: 'Linkedin', icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/company/rappi/' },
    { name: 'Facebook', icon: <Facebook size={18} />, href: 'https://www.facebook.com/RappiColombia/' },
    { name: 'Twitter', icon: <Twitter size={18} />, href: 'https://x.com/rappicolombia' },
    { name: 'Instagram', icon: <Instagram size={18} />, href: 'https://www.instagram.com/rappicolombia' },
  ];

  return (
    <footer className="w-full py-12 flex flex-col md:flex-row items-center justify-between gap-6 z-50 mt-8 border-t border-[var(--border)]">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#ff8a00] to-[#ff1744] rounded-lg flex items-center justify-center overflow-hidden transition-all duration-300 group relative shadow-md hover:shadow-[0_0_20px_rgba(255,77,0,0.5)] hover:brightness-110">
            <svg viewBox="0 0 1080 1080" className="w-full h-full fill-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]">
                <path d="M342 669.5 L305 667.5 L296 665.5 L295 661.5 L295 664.5 L291 664.5 L274 660.5 L236 644.5 L237 641.5 L225 638.5 L221.5 634 L223 630.5 L221 633.5 L208 626.5 L209.5 624 L203.5 622 L207.5 617 L200 619.5 L192 612.5 L190.5 610 L193.5 608 L190 609.5 L182.5 602 L184.5 596 L177 596.5 L176.5 592 L166.5 583 L167.5 576 L166 580.5 L160.5 574 L148.5 551 L151.5 550 L151.5 545 L148 550.5 L138.5 531 L140.5 528 L135.5 527 L131.5 513 L133 511.5 L134 514.5 L134.5 512 L131.5 504 L128.5 504 L128.5 498 L134 496.5 L136 502.5 L143 503.5 L152 512.5 L157 512.5 L157 515.5 L177 523.5 L192 526.5 L217 525.5 L221 524.5 L220 522.5 L231 524.5 L232 519.5 L239 518.5 L258.5 507 L256 505.5 L263 504.5 L276 491.5 L279 492.5 L280 488.5 L294 477.5 L297 478.5 L301.5 470 L308 467.5 L314 459.5 L336 443.5 L341 443.5 L342 439.5 L351 436.5 L352 432.5 L386 416.5 L404 413.5 L432 414.5 L443 416.5 L453 423.5 L460 423.5 L462 428.5 L464 426.5 L472 432.5 L477 432.5 L487 439.5 L490 445.5 L494 444.5 L496 449.5 L499 448.5 L495.5 451 L497 456.5 L499 452.5 L505 453.5 L514.5 461 L511.5 462 L513 463.5 L520.5 466 L521 471.5 L524 469.5 L532 476.5 L539 477.5 L537.5 476 L545 471.5 L552 470.5 L561 458.5 L564 460.5 L567 454.5 L573 450.5 L575.5 452 L577 446.5 L606 429.5 L608 425.5 L636 415.5 L662 412.5 L686 416.5 L704 423.5 L715 431.5 L718 430.5 L721 436.5 L727 436.5 L731 442.5 L734 441.5 L737 448.5 L744 448.5 L744 454.5 L747.5 454 L745 450.5 L766 464.5 L783.5 480 L784 484.5 L791.5 488 L790 492.5 L793.5 492 L793 488.5 L808 503.5 L814 504.5 L829 515.5 L834 515.5 L834 518.5 L829.5 517 L833 520.5 L837 517.5 L856 525.5 L893 524.5 L897 527.5 L896 524.5 L909 519.5 L931 504.5 L937 508.5 L938.5 507 L933.5 504 L935 500.5 L940 499.5 L943.5 504 L941.5 513 L936.5 513 L938 516.5 L939 513.5 L940.5 515 L934.5 534 L930.5 542 L927.5 541 L926.5 550 L923 554.5 L922.5 551 L919.5 551 L921.5 558 L916.5 561 L917.5 566 L913 572.5 L911.5 571 L912.5 574 L907.5 581 L901.5 584 L901.5 590 L899 588.5 L900.5 591 L895.5 592 L893.5 599 L888 599.5 L887.5 605 L882 608.5 L880 605.5 L877.5 608 L881.5 611 L878.5 615 L872 616.5 L868 623.5 L863 623.5 L861 629.5 L851 631.5 L851.5 635 L846 639.5 L830 648.5 L820 647.5 L822.5 650 L818 653.5 L800 660 L789 659.5 L787.5 661 L790.5 662 L787 663.5 L758 668.5 L713 668.5 L689 665.5 L657 656.5 L655 653.5 L650 654.5 L631 645.5 L631 640.5 L617 638.5 L613.5 635 L616 631.5 L609 631.5 L610 634.5 L598.5 626 L601 623.5 L593 623.5 L588.5 619 L591 615.5 L585 616.5 L585.5 614 L565.5 597 L568 591.5 L564 594.5 L564 591.5 L558.5 590 L559.5 584 L554 583.5 L548.5 574 L549.5 568 L545 569.5 L543.5 567 L545.5 560 L541 562.5 L539.5 555 L534 556.5 L534 553.5 L526.5 573 L523 576.5 L518.5 576 L521.5 580 L518 584.5 L514.5 583 L515.5 589 L510 594.5 L505.5 592 L506.5 599 L500.5 601 L497.5 606 L500.5 606 L492 611.5 L490 608.5 L486 617.5 L468 631.5 L459 634.5 L457 638.5 L444 639.5 L441.5 641 L449.5 642 L406 659.5 L403 659.5 L402 655.5 L396 655.5 L401.5 660 L400 661.5 Z" />
            </svg>
        </div>
        <p className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-widest">
          {t['footer-rights']}
        </p>
      </div>

      <div className="flex items-center gap-4">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-full bg-[var(--surface2)] flex items-center justify-center text-[var(--text-muted)] hover:text-rappi-orange hover:bg-rappi-orange/10 transition-all border border-[var(--border)]"
            title={link.name}
          >
            {link.icon}
          </a>
        ))}
      </div>
    </footer>
  );
});
