import React from "react";
import ArcAd from ".";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("<ArcAd>", () => {
  let props;

  beforeEach(() => {
    props = {
      dfpId: 2222,
      slotName: "homepage",
      id: "test",
      adType: "test ad type",
      display: "all",
      targeting: {},
      breakpoints: [[0, 0]],
      dimensions: [[0, 0]],
      refresh: true,
      bidding: {},
      children: <div>My Test Child</div>,
      childrenPosition: "top",
      className: "my ads container class",
      prerender: jest.fn(),
    };
  });

  it("renders", () => {
    render(<ArcAd {...props} />);

    expect(screen).toBeDefined();
  });

  it("ads a arcAdsPrerenderer function to the window", (done) => {
    const prerenderFn = jest.spyOn(window, "arcAdsPrerenderer");

    expect(window.arcAdsPrerenderer).toBeDefined();

    // make sure we get the ad prerender function running
    window.arcAdsPrerenderer({ test: "ad" }).then((adDetails) => {
      expect(prerenderFn).toHaveBeenCalled();
      expect(adDetails).toEqual({ test: "ad" });
      done();
    });
  });

  it("displays children on top", () => {
    const { container } = render(<ArcAd {...props} />);
    const html = '<div class="my ads container class"><div>My Test Child</div><div id="test" class="homepage arcad"></div></div>';

    expect(container).toContainHTML(html);
  });

  it("displays children on bottom", () => {
    props.childrenPosition = "bottom";
    const { container } = render(<ArcAd {...props} />);
    expect(container).toContainHTML(
      '<div class="my ads container class"><div id="test" class="homepage arcad"></div><div>My Test Child</div></div>',
    );
  });
});
