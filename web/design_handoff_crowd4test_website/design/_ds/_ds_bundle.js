/* @ds-bundle: {"format":4,"namespace":"Crowd4TestDesignSystem_772017","components":[{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Logo","sourcePath":"components/core/Logo.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"CapabilitySection","sourcePath":"components/marketing/CapabilitySection.jsx"},{"name":"CaseStudyCard","sourcePath":"components/marketing/CaseStudyCard.jsx"},{"name":"ContactForm","sourcePath":"components/marketing/ContactForm.jsx"},{"name":"CtaBanner","sourcePath":"components/marketing/CtaBanner.jsx"},{"name":"FaqAccordion","sourcePath":"components/marketing/FaqAccordion.jsx"},{"name":"FeatureCard","sourcePath":"components/marketing/FeatureCard.jsx"},{"name":"Hero","sourcePath":"components/marketing/Hero.jsx"},{"name":"IndustryCard","sourcePath":"components/marketing/IndustryCard.jsx"},{"name":"LogoCloud","sourcePath":"components/marketing/LogoCloud.jsx"},{"name":"Media","sourcePath":"components/marketing/Media.jsx"},{"name":"PricingTable","sourcePath":"components/marketing/PricingTable.jsx"},{"name":"ResourceCard","sourcePath":"components/marketing/ResourceCard.jsx"},{"name":"Section","sourcePath":"components/marketing/Section.jsx"},{"name":"SectionHeader","sourcePath":"components/marketing/SectionHeader.jsx"},{"name":"ServiceCard","sourcePath":"components/marketing/ServiceCard.jsx"},{"name":"StatBlock","sourcePath":"components/marketing/StatBlock.jsx"},{"name":"Testimonial","sourcePath":"components/marketing/Testimonial.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"DEFAULT_FOOTER_COLUMNS","sourcePath":"components/navigation/Footer.jsx"},{"name":"Footer","sourcePath":"components/navigation/Footer.jsx"},{"name":"Pagination","sourcePath":"components/navigation/Pagination.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"DEFAULT_NAV","sourcePath":"components/navigation/TopNav.jsx"},{"name":"TopNav","sourcePath":"components/navigation/TopNav.jsx"}],"sourceHashes":{"components/core/Badge.jsx":"6eeddd46e350","components/core/Button.jsx":"f81aab9fcb57","components/core/Icon.jsx":"0ebc016510a8","components/core/IconButton.jsx":"3e97b9ba0af1","components/core/Logo.jsx":"3d37b3e1b226","components/core/Tag.jsx":"22e532c56597","components/forms/Checkbox.jsx":"0b8d01f949f1","components/forms/Field.jsx":"70fa18a47a3e","components/forms/Input.jsx":"a90c0f74f61b","components/forms/Radio.jsx":"56787e6f62ef","components/forms/Select.jsx":"b40d955b1cf4","components/forms/Switch.jsx":"0fd07e650656","components/forms/Textarea.jsx":"90293be61895","components/marketing/CapabilitySection.jsx":"bc27465cbd29","components/marketing/CaseStudyCard.jsx":"c525e691f678","components/marketing/ContactForm.jsx":"af0e985fb703","components/marketing/CtaBanner.jsx":"b2c2a08c3b0b","components/marketing/FaqAccordion.jsx":"9c95b82c01f8","components/marketing/FeatureCard.jsx":"fd418c11d16a","components/marketing/Hero.jsx":"a1e93a4fa6be","components/marketing/IndustryCard.jsx":"9928a22f30ab","components/marketing/LogoCloud.jsx":"8587a4b18ae6","components/marketing/Media.jsx":"b04a1228e2d9","components/marketing/PricingTable.jsx":"7c8b38aa6916","components/marketing/ResourceCard.jsx":"2bd5f35c233e","components/marketing/Section.jsx":"a066115aa952","components/marketing/SectionHeader.jsx":"3954040f40f1","components/marketing/ServiceCard.jsx":"969a3f1f63d2","components/marketing/StatBlock.jsx":"c444bbbc0c35","components/marketing/Testimonial.jsx":"630769905370","components/navigation/Breadcrumb.jsx":"27a4649da493","components/navigation/Footer.jsx":"25cb410a1240","components/navigation/Pagination.jsx":"7a369803f6ff","components/navigation/Tabs.jsx":"ce576189de42","components/navigation/TopNav.jsx":"cb9b808d3dac","ui_kits/website/App.jsx":"d0ce2c3de582","ui_kits/website/CompanyPages.jsx":"bfeed266bcf5","ui_kits/website/HomePage.jsx":"51da6073f491","ui_kits/website/PricingPage.jsx":"6e52ef8ecb60","ui_kits/website/ProductPages.jsx":"6082d35cba91","ui_kits/website/ProofPages.jsx":"69850382ce82","ui_kits/website/ResourcePages.jsx":"596c63f1f8e2","ui_kits/website/content.js":"b688de7ef0b3"},"inlinedExternals":[],"unexposedExports":[{"name":"controlBase","sourcePath":"components/forms/Input.jsx"}]} */

(() => {

const __ds_ns = (window.Crowd4TestDesignSystem_772017 = window.Crowd4TestDesignSystem_772017 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Icon.jsx
try { (() => {
const LUCIDE_CDN = "https://unpkg.com/lucide-static@0.544.0/icons";

/**
 * Renders a Lucide icon as a masked block so it inherits `currentColor`.
 * Crowd4Test uses Lucide at 2px stroke for all UI iconography.
 */
function Icon({
  name,
  size = 20,
  strokeWidth,
  color = "currentColor",
  style,
  className,
  label
}) {
  const url = `${LUCIDE_CDN}/${name}.svg`;
  const mask = {
    WebkitMaskImage: `url(${url})`,
    maskImage: `url(${url})`,
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskSize: "contain",
    maskSize: "contain"
  };
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    role: label ? "img" : "presentation",
    "aria-label": label,
    "aria-hidden": label ? undefined : "true",
    "data-stroke": strokeWidth,
    style: {
      display: "inline-block",
      flex: "none",
      width: size,
      height: size,
      background: color,
      verticalAlign: "middle",
      ...mask,
      ...style
    }
  });
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const TONES = {
  neutral: {
    background: "var(--surface-muted)",
    color: "var(--text-secondary)"
  },
  brand: {
    background: "var(--surface-brand-subtle)",
    color: "var(--text-brand)"
  },
  accent: {
    background: "var(--surface-accent-subtle)",
    color: "var(--text-accent)"
  },
  success: {
    background: "var(--status-success-bg)",
    color: "var(--status-success-fg)"
  },
  warning: {
    background: "var(--status-warning-bg)",
    color: "var(--status-warning-fg)"
  },
  error: {
    background: "var(--status-error-bg)",
    color: "var(--status-error-fg)"
  },
  info: {
    background: "var(--status-info-bg)",
    color: "var(--status-info-fg)"
  },
  inverse: {
    background: "rgb(255 255 255 / 0.1)",
    color: "var(--text-inverse)"
  }
};
function Badge({
  children,
  tone = "neutral",
  icon,
  dot,
  uppercase = true,
  style,
  className
}) {
  const t = TONES[tone] || TONES.neutral;
  return /*#__PURE__*/React.createElement("span", {
    className: className,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 24,
      padding: "0 10px",
      borderRadius: "var(--radius-full)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: uppercase ? "0.08em" : 0,
      textTransform: uppercase ? "uppercase" : "none",
      whiteSpace: "nowrap",
      ...t,
      ...style
    }
  }, dot ? /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "currentColor"
    }
  }) : null, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 12
  }) : null, children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    height: 36,
    padding: "0 14px",
    fontSize: "var(--type-button-sm-size)",
    icon: 16,
    gap: 6
  },
  md: {
    height: 44,
    padding: "0 20px",
    fontSize: "var(--type-button-md-size)",
    icon: 18,
    gap: 8
  },
  lg: {
    height: 52,
    padding: "0 26px",
    fontSize: "var(--type-button-lg-size)",
    icon: 20,
    gap: 8
  }
};
const VARIANTS = {
  primary: {
    background: "var(--action-primary-bg)",
    color: "var(--text-on-brand)",
    border: "1px solid transparent"
  },
  secondary: {
    background: "var(--action-secondary-bg)",
    color: "var(--text-primary)",
    border: "1px solid var(--action-secondary-border)"
  },
  ghost: {
    background: "transparent",
    color: "var(--text-primary)",
    border: "1px solid transparent"
  },
  link: {
    background: "transparent",
    color: "var(--text-brand)",
    border: "1px solid transparent",
    padding: 0,
    height: "auto"
  },
  inverse: {
    background: "var(--action-inverse-bg)",
    color: "var(--action-inverse-text)",
    border: "1px solid transparent"
  },
  "inverse-ghost": {
    background: "transparent",
    color: "var(--text-inverse)",
    border: "1px solid var(--border-inverse)"
  }
};
function Button({
  children,
  variant = "primary",
  size = "md",
  iconLeft,
  iconRight,
  fullWidth,
  disabled,
  href,
  type = "button",
  onClick,
  className,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md;
  const v = VARIANTS[variant] || VARIANTS.primary;
  const Tag = href ? "a" : "button";
  const base = {
    display: fullWidth ? "flex" : "inline-flex",
    width: fullWidth ? "100%" : undefined,
    alignItems: "center",
    justifyContent: "center",
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: "var(--font-sans)",
    fontSize: s.fontSize,
    fontWeight: "var(--fw-medium)",
    lineHeight: 1,
    letterSpacing: "-0.1px",
    borderRadius: "var(--radius-button)",
    cursor: disabled ? "not-allowed" : "pointer",
    textDecoration: variant === "link" ? "underline" : "none",
    textUnderlineOffset: 4,
    whiteSpace: "nowrap",
    transition: "var(--transition-control)",
    opacity: disabled ? 0.55 : 1,
    ...v,
    ...style
  };
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: ["c4t-btn", `c4t-btn--${variant}`, className].filter(Boolean).join(" "),
    href: href,
    type: href ? undefined : type,
    disabled: href ? undefined : disabled,
    "aria-disabled": disabled || undefined,
    onClick: disabled ? undefined : onClick,
    style: base
  }, rest), iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: s.icon
  }) : null, children, iconRight ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconRight,
    size: s.icon
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: 32,
  md: 40,
  lg: 48
};
function IconButton({
  icon,
  label,
  size = "md",
  variant = "ghost",
  disabled,
  onClick,
  href,
  style,
  className,
  ...rest
}) {
  const box = SIZES[size] || SIZES.md;
  const surfaces = {
    ghost: {
      background: "transparent",
      border: "1px solid transparent"
    },
    outline: {
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)"
    },
    filled: {
      background: "var(--surface-sunken)",
      border: "1px solid transparent"
    }
  };
  const Tag = href ? "a" : "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({
    className: ["c4t-iconbtn", className].filter(Boolean).join(" "),
    href: href,
    type: href ? undefined : "button",
    "aria-label": label,
    disabled: href ? undefined : disabled,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: box,
      height: box,
      borderRadius: "var(--radius-sm)",
      color: "var(--text-secondary)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.5 : 1,
      transition: "var(--transition-control)",
      ...surfaces[variant],
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: size === "sm" ? 16 : size === "lg" ? 22 : 18
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Logo.jsx
try { (() => {
/**
 * No logo files were supplied with the brief, so the brand mark is the wordmark
 * set in the display face with the "4" in coral. Replace with real artwork when available.
 */
function Logo({
  size = 22,
  tone = "default",
  href = "/",
  style,
  className
}) {
  const color = tone === "inverse" ? "var(--text-inverse)" : "var(--text-primary)";
  const accent = tone === "inverse" ? "var(--coral-400)" : "var(--coral-500)";
  const Tag = href ? "a" : "span";
  return /*#__PURE__*/React.createElement(Tag, {
    className: className,
    href: href,
    "aria-label": "Crowd4Test",
    style: {
      display: "inline-flex",
      alignItems: "center",
      fontFamily: "var(--font-display)",
      fontWeight: "var(--fw-semibold)",
      fontSize: size,
      letterSpacing: size * -0.038,
      lineHeight: 1,
      color,
      textDecoration: "none",
      ...style
    }
  }, "Crowd", /*#__PURE__*/React.createElement("span", {
    style: {
      color: accent
    }
  }, "4"), "Test");
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Logo.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function Tag({
  children,
  active,
  href,
  onClick,
  style,
  className
}) {
  const Tag_ = href ? "a" : onClick ? "button" : "span";
  return /*#__PURE__*/React.createElement(Tag_, {
    className: className,
    href: href,
    type: onClick && !href ? "button" : undefined,
    onClick: onClick,
    style: {
      display: "inline-flex",
      alignItems: "center",
      height: 32,
      padding: "0 14px",
      borderRadius: "var(--radius-full)",
      border: `1px solid ${active ? "var(--ink-950)" : "var(--border-default)"}`,
      background: active ? "var(--ink-950)" : "var(--surface-canvas)",
      color: active ? "var(--text-inverse)" : "var(--text-secondary)",
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)",
      lineHeight: 1,
      textDecoration: "none",
      cursor: href || onClick ? "pointer" : "default",
      transition: "var(--transition-control)",
      ...style
    }
  }, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function Checkbox({
  label,
  description,
  checked,
  defaultChecked,
  onChange,
  disabled,
  id,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: className,
    style: {
      display: "flex",
      gap: 10,
      alignItems: description ? "flex-start" : "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      marginTop: description ? 2 : 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: id,
    checked: checked,
    defaultChecked: defaultChecked,
    onChange: onChange,
    disabled: disabled,
    style: {
      appearance: "none",
      margin: 0,
      width: 20,
      height: 20,
      borderRadius: "var(--radius-xs)",
      border: "1px solid var(--border-strong)",
      background: checked ? "var(--ink-950)" : "var(--surface-canvas)",
      cursor: "inherit",
      transition: "var(--transition-control)"
    }
  }), checked ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 14,
    style: {
      position: "absolute",
      inset: 0,
      margin: "auto",
      color: "var(--white)",
      pointerEvents: "none"
    }
  }) : null), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-body-sm-size)",
      lineHeight: 1.45,
      color: "var(--text-primary)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function Field({
  label,
  hint,
  error,
  required,
  htmlFor,
  children,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontSize: "var(--type-label-size)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)",
      lineHeight: "var(--type-label-line)"
    }
  }, label, required ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--status-error-fg)",
      marginLeft: 3
    }
  }, "*") : null) : null, children, error ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--status-error-fg)"
    }
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)"
    }
  }, hint) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const controlBase = {
  width: "100%",
  minHeight: 48,
  padding: "12px 14px",
  fontFamily: "var(--font-sans)",
  fontSize: "var(--type-body-md-size)",
  lineHeight: 1.4,
  color: "var(--text-primary)",
  background: "var(--surface-canvas)",
  border: "1px solid var(--border-default)",
  borderRadius: "var(--radius-input)",
  transition: "var(--transition-control)"
};
function Input({
  iconLeft,
  invalid,
  disabled,
  style,
  className,
  ...rest
}) {
  const input = /*#__PURE__*/React.createElement("input", _extends({
    className: ["c4t-input", className].filter(Boolean).join(" "),
    "aria-invalid": invalid || undefined,
    disabled: disabled,
    style: {
      ...controlBase,
      paddingLeft: iconLeft ? 42 : 14,
      background: disabled ? "var(--surface-sunken)" : controlBase.background,
      color: disabled ? "var(--text-disabled)" : controlBase.color,
      ...style
    }
  }, rest));
  if (!iconLeft) return input;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 18,
    style: {
      position: "absolute",
      left: 14,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
      pointerEvents: "none"
    }
  }), input);
}
Object.assign(__ds_scope, { controlBase, Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
function Radio({
  label,
  description,
  name,
  value,
  checked,
  onChange,
  disabled,
  id,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: className,
    style: {
      display: "flex",
      gap: 10,
      alignItems: description ? "flex-start" : "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      flex: "none",
      marginTop: description ? 2 : 0
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    id: id,
    name: name,
    value: value,
    checked: checked,
    onChange: onChange,
    disabled: disabled,
    style: {
      appearance: "none",
      margin: 0,
      width: 20,
      height: 20,
      borderRadius: 999,
      border: `${checked ? 6 : 1}px solid ${checked ? "var(--coral-500)" : "var(--border-strong)"}`,
      background: "var(--surface-canvas)",
      cursor: "inherit",
      transition: "var(--transition-control)"
    }
  })), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-body-sm-size)",
      lineHeight: 1.45,
      color: "var(--text-primary)"
    }
  }, label), description ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, description) : null));
}
Object.assign(__ds_scope, { Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Select({
  options = [],
  invalid,
  placeholder,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    className: ["c4t-input", className].filter(Boolean).join(" "),
    "aria-invalid": invalid || undefined,
    style: {
      ...__ds_scope.controlBase,
      appearance: "none",
      paddingRight: 40,
      cursor: "pointer",
      ...style
    }
  }, rest), placeholder ? /*#__PURE__*/React.createElement("option", {
    value: ""
  }, placeholder) : null, options.map(o => {
    const value = typeof o === "string" ? o : o.value;
    const label = typeof o === "string" ? o : o.label;
    return /*#__PURE__*/React.createElement("option", {
      key: value,
      value: value
    }, label);
  })), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 18,
    style: {
      position: "absolute",
      right: 14,
      top: "50%",
      transform: "translateY(-50%)",
      color: "var(--text-muted)",
      pointerEvents: "none"
    }
  }));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function Switch({
  label,
  checked,
  onChange,
  disabled,
  id,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: className,
    style: {
      display: "inline-flex",
      gap: 10,
      alignItems: "center",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? 0.55 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: id,
    role: "switch",
    "aria-checked": !!checked,
    disabled: disabled,
    onClick: onChange,
    style: {
      width: 44,
      height: 26,
      flex: "none",
      padding: 3,
      borderRadius: 999,
      border: "none",
      background: checked ? "var(--coral-500)" : "var(--ink-300)",
      cursor: "inherit",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      width: 20,
      height: 20,
      borderRadius: 999,
      background: "var(--white)",
      boxShadow: "var(--shadow-xs)",
      transform: `translateX(${checked ? 18 : 0}px)`,
      transition: `transform var(--duration-fast) var(--ease-standard)`
    }
  })), label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-primary)"
    }
  }, label) : null);
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Textarea({
  rows = 5,
  invalid,
  style,
  className,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    className: ["c4t-input", className].filter(Boolean).join(" "),
    "aria-invalid": invalid || undefined,
    style: {
      ...__ds_scope.controlBase,
      resize: "vertical",
      ...style
    }
  }, rest));
}
Object.assign(__ds_scope, { Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ContactForm.jsx
try { (() => {
function ContactForm({
  title = "Book a demo",
  description,
  submitLabel = "Request my demo",
  onSubmit,
  style,
  className
}) {
  const [sent, setSent] = React.useState(false);
  const [consent, setConsent] = React.useState(false);
  const submit = e => {
    e.preventDefault();
    setSent(true);
    if (onSubmit) onSubmit(Object.fromEntries(new FormData(e.target).entries()));
  };
  if (sent) {
    return /*#__PURE__*/React.createElement("div", {
      className: className,
      style: {
        padding: 40,
        background: "var(--surface-canvas)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-panel)",
        textAlign: "center",
        ...style
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check-circle-2",
      size: 40,
      style: {
        color: "var(--teal-500)",
        margin: "0 auto 16px"
      }
    }), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontSize: "var(--type-heading-md-size)",
        letterSpacing: "-0.2px"
      }
    }, "Thanks \u2014 we'll be in touch"), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 10,
        fontSize: "var(--type-body-sm-size)",
        color: "var(--text-secondary)"
      }
    }, "A quality engineer will reply within one business day with times that suit your team."), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: "secondary",
      onClick: () => setSent(false)
    }, "Send another")));
  }
  return /*#__PURE__*/React.createElement("form", {
    className: className,
    onSubmit: submit,
    style: {
      padding: 32,
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-panel)",
      boxShadow: "var(--shadow-sm)",
      display: "flex",
      flexDirection: "column",
      gap: 16,
      ...style
    }
  }, title ? /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--type-heading-md-size)",
      letterSpacing: "var(--type-heading-md-tracking)"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-secondary)",
      marginTop: -8
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    },
    className: "c4t-form-row"
  }, /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "First name",
    required: true,
    htmlFor: "fn"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "fn",
    name: "firstName",
    required: true
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "Last name",
    required: true,
    htmlFor: "ln"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "ln",
    name: "lastName",
    required: true
  }))), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "Work email",
    required: true,
    htmlFor: "we"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "we",
    name: "email",
    type: "email",
    placeholder: "you@company.com",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    },
    className: "c4t-form-row"
  }, /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "Company",
    required: true,
    htmlFor: "co"
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    id: "co",
    name: "company",
    required: true
  })), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "Team size",
    htmlFor: "ts"
  }, /*#__PURE__*/React.createElement(__ds_scope.Select, {
    id: "ts",
    name: "size",
    placeholder: "Select",
    options: ["1–50", "51–500", "501–5,000", "5,000+"]
  }))), /*#__PURE__*/React.createElement(__ds_scope.Field, {
    label: "What do you need tested?",
    htmlFor: "msg",
    hint: "A sentence is plenty \u2014 we'll take it from there."
  }, /*#__PURE__*/React.createElement(__ds_scope.Textarea, {
    id: "msg",
    name: "message",
    rows: 4
  })), /*#__PURE__*/React.createElement(__ds_scope.Checkbox, {
    label: "Email me the quarterly QE benchmark report.",
    checked: consent,
    onChange: () => setConsent(!consent)
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    size: "lg",
    fullWidth: true
  }, submitLabel), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, "We reply within one business day. No sales sequence."));
}
Object.assign(__ds_scope, { ContactForm });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ContactForm.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CtaBanner.jsx
try { (() => {
function CtaBanner({
  eyebrow,
  title,
  description,
  primaryCta = "Book a demo",
  secondaryCta,
  note,
  tone = "inverse",
  onAction,
  style,
  className
}) {
  const inverse = tone === "inverse";
  const brand = tone === "brand";
  const bg = inverse ? "var(--surface-inverse)" : brand ? "var(--coral-500)" : "var(--surface-sunken)";
  const fg = inverse || brand ? "var(--text-inverse)" : "var(--text-primary)";
  const sub = inverse ? "var(--text-inverse-muted)" : brand ? "rgb(255 255 255 / 0.85)" : "var(--text-secondary)";
  return /*#__PURE__*/React.createElement("section", {
    className: className,
    style: {
      background: bg,
      color: fg,
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      padding: "72px var(--container-gutter)",
      display: "grid",
      gridTemplateColumns: "1.2fr auto",
      gap: 40,
      alignItems: "center"
    },
    className: "c4t-cta-grid"
  }, /*#__PURE__*/React.createElement("div", null, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-eyebrow-size)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--type-eyebrow-tracking)",
      textTransform: "uppercase",
      color: brand ? "rgb(255 255 255 / 0.8)" : "var(--coral-400)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 12,
      fontSize: "var(--type-display-md-size)",
      lineHeight: "var(--type-display-md-line)",
      letterSpacing: "var(--type-display-md-tracking)",
      color: fg,
      maxWidth: 620,
      textWrap: "balance"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: "var(--type-body-lg-size)",
      color: sub,
      maxWidth: 560
    }
  }, description) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12,
      alignItems: "stretch",
      minWidth: 220
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    variant: brand ? "inverse" : "primary",
    iconRight: "arrow-right",
    onClick: () => onAction && onAction(primaryCta)
  }, primaryCta), secondaryCta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    variant: "inverse-ghost",
    onClick: () => onAction && onAction(secondaryCta)
  }, secondaryCta) : null, note ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: sub,
      textAlign: "center"
    }
  }, note) : null)));
}
Object.assign(__ds_scope, { CtaBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CtaBanner.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FaqAccordion.jsx
try { (() => {
function FaqAccordion({
  items = [],
  defaultOpen = 0,
  style,
  className
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      borderTop: "1px solid var(--border-default)",
      ...style
    }
  }, items.map((item, i) => {
    const on = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: item.q,
      style: {
        borderBottom: "1px solid var(--border-default)"
      }
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "c4t-faq-trigger",
      "aria-expanded": on,
      onClick: () => setOpen(on ? -1 : i),
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 24,
        padding: "22px 12px 22px 0",
        background: "transparent",
        border: "none",
        textAlign: "left",
        cursor: "pointer",
        fontSize: "var(--type-heading-sm-size)",
        fontWeight: "var(--fw-medium)",
        letterSpacing: "-0.1px",
        color: "var(--text-primary)",
        transition: "var(--transition-control)"
      }
    }, item.q, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: on ? "minus" : "plus",
      size: 20,
      style: {
        color: "var(--text-muted)",
        flex: "none"
      }
    })), on ? /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "0 60px 24px 0",
        fontSize: "var(--type-body-md-size)",
        lineHeight: 1.65,
        color: "var(--text-secondary)",
        maxWidth: 760
      }
    }, item.a) : null);
  }));
}
Object.assign(__ds_scope, { FaqAccordion });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FaqAccordion.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FeatureCard.jsx
try { (() => {
function FeatureCard({
  icon,
  title,
  description,
  meta,
  href,
  onClick,
  tone = "canvas",
  style,
  className
}) {
  const inverse = tone === "inverse";
  const Tag = href || onClick ? "a" : "div";
  return /*#__PURE__*/React.createElement(Tag, {
    href: href,
    onClick: onClick,
    className: ["c4t-card-hover", className].filter(Boolean).join(" "),
    style: {
      display: "block",
      padding: "var(--space-card-padding)",
      background: inverse ? "var(--surface-inverse-raised)" : "var(--surface-canvas)",
      border: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
      color: "inherit",
      cursor: href || onClick ? "pointer" : "default",
      ...style
    }
  }, icon ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 44,
      height: 44,
      borderRadius: "var(--radius-sm)",
      background: inverse ? "rgb(255 255 255 / 0.07)" : "var(--surface-brand-subtle)",
      color: "var(--coral-500)",
      marginBottom: 18
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 22
  })) : null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--type-heading-sm-size)",
      lineHeight: "var(--type-heading-sm-line)",
      letterSpacing: "var(--type-heading-sm-tracking)",
      color: inverse ? "var(--text-inverse)" : "var(--text-primary)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: "var(--type-body-sm-size)",
      lineHeight: "var(--type-body-sm-line)",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-secondary)"
    }
  }, description) : null, meta ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-subtle)"}`,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, meta) : null);
}
Object.assign(__ds_scope, { FeatureCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FeatureCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/LogoCloud.jsx
try { (() => {
/**
 * Customer logo row. No customer marks were supplied — each cell renders the
 * company name as a wordmark placeholder at reduced contrast. Swap in real SVGs.
 */
function LogoCloud({
  logos = [],
  label,
  tone = "canvas",
  style,
  className
}) {
  const inverse = tone === "inverse";
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
      ...style
    }
  }, label ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-eyebrow-size)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--type-eyebrow-tracking)",
      textTransform: "uppercase",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-muted)",
      textAlign: "center"
    }
  }, label) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      alignItems: "center",
      gap: "28px 56px"
    }
  }, logos.map(l => /*#__PURE__*/React.createElement("span", {
    key: l,
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "-0.6px",
      color: inverse ? "var(--text-inverse)" : "var(--ink-400)",
      opacity: inverse ? 0.7 : 1
    }
  }, l))));
}
Object.assign(__ds_scope, { LogoCloud });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/LogoCloud.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Media.jsx
try { (() => {
/**
 * Photography placeholder. No image library shipped with the brief — every
 * marketing surface uses this plate so real assets can be dropped in later.
 */
function Media({
  ratio = "16 / 9",
  label = "Image",
  icon = "image",
  tone = "sunken",
  radius = "var(--radius-media)",
  style,
  className,
  children
}) {
  const tones = {
    sunken: {
      background: "var(--surface-sunken)",
      color: "var(--text-disabled)",
      border: "1px solid var(--border-subtle)"
    },
    brand: {
      background: "var(--surface-brand-subtle)",
      color: "var(--coral-400)",
      border: "1px solid var(--coral-100)"
    },
    accent: {
      background: "var(--surface-accent-subtle)",
      color: "var(--teal-500)",
      border: "1px solid var(--teal-100)"
    },
    inverse: {
      background: "var(--surface-inverse-raised)",
      color: "var(--text-inverse-muted)",
      border: "1px solid var(--border-inverse)"
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      position: "relative",
      aspectRatio: ratio,
      width: "100%",
      borderRadius: radius,
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8,
      ...tones[tone],
      ...style
    }
  }, children || /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 20
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, label)));
}
Object.assign(__ds_scope, { Media });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Media.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CapabilitySection.jsx
try { (() => {
/**
 * The "AI + human" explainer band: a list of capabilities on one side, a
 * product plate on the other, with the active row driving what is shown.
 */
function CapabilitySection({
  eyebrow,
  title,
  description,
  capabilities = [],
  media,
  tone = "sunken",
  reverse,
  style,
  className
}) {
  const [active, setActive] = React.useState(0);
  const inverse = tone === "inverse";
  const bg = inverse ? "var(--surface-inverse)" : tone === "sunken" ? "var(--surface-sunken)" : "var(--surface-canvas)";
  const fg = inverse ? "var(--text-inverse)" : "var(--text-primary)";
  const muted = inverse ? "var(--text-inverse-muted)" : "var(--text-secondary)";
  const current = capabilities[active] || {};
  return /*#__PURE__*/React.createElement("section", {
    className: className,
    style: {
      background: bg,
      color: fg,
      paddingBlock: "var(--space-section-y)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      paddingInline: "var(--container-gutter)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 700
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-eyebrow-size)",
      fontWeight: 600,
      letterSpacing: "var(--type-eyebrow-tracking)",
      textTransform: "uppercase",
      color: inverse ? "var(--coral-400)" : "var(--text-brand)"
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 14,
      fontSize: "var(--type-display-md-size)",
      lineHeight: "var(--type-display-md-line)",
      letterSpacing: "var(--type-display-md-tracking)",
      color: fg,
      textWrap: "balance"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 14,
      fontSize: "var(--type-body-lg-size)",
      color: muted
    }
  }, description) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      display: "grid",
      gridTemplateColumns: reverse ? "1.1fr 0.9fr" : "0.9fr 1.1fr",
      gap: 48,
      alignItems: "start",
      direction: reverse ? "rtl" : "ltr"
    },
    className: "c4t-capability-grid"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      direction: "ltr",
      display: "flex",
      flexDirection: "column"
    }
  }, capabilities.map((c, i) => {
    const on = i === active;
    return /*#__PURE__*/React.createElement("button", {
      key: c.title,
      type: "button",
      onClick: () => setActive(i),
      style: {
        textAlign: "left",
        background: "transparent",
        border: "none",
        borderLeft: `2px solid ${on ? "var(--coral-500)" : inverse ? "var(--border-inverse)" : "var(--border-default)"}`,
        padding: "18px 0 18px 20px",
        cursor: "pointer",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        fontSize: "var(--type-heading-sm-size)",
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "-0.1px",
        color: on ? fg : inverse ? "var(--text-inverse-muted)" : "var(--text-muted)"
      }
    }, c.icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: c.icon,
      size: 18,
      style: {
        color: on ? "var(--coral-500)" : "currentColor"
      }
    }) : null, c.title), on && c.description ? /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        marginTop: 8,
        fontSize: "var(--type-body-sm-size)",
        lineHeight: 1.6,
        color: muted,
        maxWidth: 420
      }
    }, c.description) : null);
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      direction: "ltr"
    }
  }, media || /*#__PURE__*/React.createElement(__ds_scope.Media, {
    ratio: "4 / 3",
    label: current.title || "Product view",
    icon: current.icon || "monitor",
    tone: inverse ? "inverse" : "sunken",
    style: {
      background: inverse ? undefined : "var(--surface-canvas)"
    }
  })))));
}
Object.assign(__ds_scope, { CapabilitySection });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CapabilitySection.jsx", error: String((e && e.message) || e) }); }

// components/marketing/CaseStudyCard.jsx
try { (() => {
function CaseStudyCard({
  client,
  industry,
  headline,
  results = [],
  featured,
  href,
  onClick,
  style,
  className
}) {
  if (featured) {
    return /*#__PURE__*/React.createElement("a", {
      href: href || "#",
      onClick: onClick,
      className: ["c4t-card-hover", "c4t-casestudy-featured", className].filter(Boolean).join(" "),
      style: {
        display: "grid",
        gridTemplateColumns: "1.1fr 1fr",
        gap: 0,
        overflow: "hidden",
        background: "var(--surface-canvas)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-panel)",
        textDecoration: "none",
        color: "inherit",
        ...style
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: 40,
        display: "flex",
        flexDirection: "column"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: 10,
        alignItems: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--text-brand)"
      }
    }, "Case study"), industry), /*#__PURE__*/React.createElement("h3", {
      style: {
        marginTop: 16,
        fontSize: "var(--type-heading-lg-size)",
        lineHeight: "var(--type-heading-lg-line)",
        letterSpacing: "var(--type-heading-lg-tracking)",
        textWrap: "pretty"
      }
    }, headline), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 28,
        display: "grid",
        gridTemplateColumns: `repeat(${Math.min(results.length, 3) || 1}, 1fr)`,
        gap: 20
      }
    }, results.map(r => /*#__PURE__*/React.createElement("div", {
      key: r.label
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 32,
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "-1px",
        fontVariantNumeric: "tabular-nums",
        color: "var(--text-primary)"
      }
    }, r.value), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 4,
        fontSize: "var(--type-caption-size)",
        color: "var(--text-muted)"
      }
    }, r.label)))), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginTop: "auto",
        paddingTop: 32,
        fontSize: "var(--type-body-sm-size)",
        fontWeight: "var(--fw-medium)",
        color: "var(--text-brand)"
      }
    }, "Read the ", client, " story ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrow-right",
      size: 15
    }))), /*#__PURE__*/React.createElement(__ds_scope.Media, {
      ratio: "auto",
      label: client,
      icon: "building-2",
      tone: "sunken",
      radius: "0",
      style: {
        height: "100%",
        aspectRatio: "auto",
        borderWidth: 0,
        borderLeft: "1px solid var(--border-subtle)"
      }
    }));
  }
  return /*#__PURE__*/React.createElement("a", {
    href: href || "#",
    onClick: onClick,
    className: ["c4t-card-hover", className].filter(Boolean).join(" "),
    style: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
      color: "inherit",
      height: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    ratio: "16 / 9",
    label: client,
    icon: "building-2",
    tone: "sunken",
    radius: "0",
    style: {
      borderWidth: 0,
      borderBottom: "1px solid var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-card-padding)",
      display: "flex",
      flexDirection: "column",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, industry), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 10,
      fontSize: "var(--type-heading-sm-size)",
      lineHeight: 1.35,
      letterSpacing: "-0.1px",
      textWrap: "pretty"
    }
  }, headline), results.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      paddingTop: 16,
      borderTop: "1px solid var(--border-subtle)",
      display: "flex",
      gap: 24
    }
  }, results.slice(0, 2).map(r => /*#__PURE__*/React.createElement("div", {
    key: r.label
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 22,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "-0.5px",
      fontVariantNumeric: "tabular-nums"
    }
  }, r.value), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, r.label)))) : null));
}
Object.assign(__ds_scope, { CaseStudyCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/CaseStudyCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Hero.jsx
try { (() => {
function Hero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  bullets,
  media,
  tone = "canvas",
  align = "split",
  trustLine,
  onAction,
  style,
  className
}) {
  const inverse = tone === "inverse";
  const wrap = {
    background: inverse ? "var(--surface-inverse)" : tone === "sunken" ? "var(--surface-sunken)" : "var(--surface-canvas)",
    color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
    paddingBlock: "var(--space-13)",
    borderBottom: inverse ? "none" : "1px solid var(--border-subtle)",
    ...style
  };
  const centered = align === "center";
  const copy = /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: centered ? "center" : "flex-start",
      textAlign: centered ? "center" : "left",
      maxWidth: centered ? 820 : 560,
      marginInline: centered ? "auto" : 0
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-eyebrow-size)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--type-eyebrow-tracking)",
      textTransform: "uppercase",
      color: inverse ? "var(--coral-400)" : "var(--text-brand)",
      marginBottom: 18
    }
  }, eyebrow) : null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: centered ? "var(--type-display-2xl-size)" : "var(--type-display-xl-size)",
      lineHeight: centered ? "var(--type-display-2xl-line)" : "var(--type-display-xl-line)",
      letterSpacing: centered ? "var(--type-display-2xl-tracking)" : "var(--type-display-xl-tracking)",
      color: "inherit",
      textWrap: "balance"
    },
    className: "c4t-hero-title"
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontSize: "var(--type-body-lg-size)",
      lineHeight: "var(--type-body-lg-line)",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-secondary)",
      maxWidth: 540
    }
  }, description) : null, bullets && bullets.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "24px 0 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10,
      textAlign: "left"
    }
  }, bullets.map(b => /*#__PURE__*/React.createElement("li", {
    key: b,
    style: {
      display: "flex",
      gap: 10,
      alignItems: "flex-start",
      fontSize: "var(--type-body-md-size)",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 18,
    style: {
      color: "var(--coral-500)",
      marginTop: 3
    }
  }), b))) : null, primaryCta || secondaryCta ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 32,
      justifyContent: centered ? "center" : "flex-start"
    }
  }, primaryCta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    variant: inverse ? "primary" : "primary",
    iconRight: "arrow-right",
    onClick: () => onAction && onAction(primaryCta)
  }, primaryCta) : null, secondaryCta ? /*#__PURE__*/React.createElement(__ds_scope.Button, {
    size: "lg",
    variant: inverse ? "inverse-ghost" : "secondary",
    onClick: () => onAction && onAction(secondaryCta)
  }, secondaryCta) : null) : null, trustLine ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 20,
      fontSize: "var(--type-caption-size)",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, trustLine) : null);
  return /*#__PURE__*/React.createElement("section", {
    className: className,
    style: wrap
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      paddingInline: "var(--container-gutter)"
    }
  }, centered ? /*#__PURE__*/React.createElement(React.Fragment, null, copy, media !== false ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 56
    }
  }, media || /*#__PURE__*/React.createElement(__ds_scope.Media, {
    ratio: "21 / 9",
    label: "Product view",
    icon: "monitor",
    tone: inverse ? "inverse" : "sunken"
  })) : null) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.05fr 1fr",
      gap: 56,
      alignItems: "center"
    },
    className: "c4t-hero-split"
  }, copy, /*#__PURE__*/React.createElement("div", null, media || /*#__PURE__*/React.createElement(__ds_scope.Media, {
    ratio: "4 / 3",
    label: "Product view",
    icon: "monitor",
    tone: inverse ? "inverse" : "sunken"
  })))));
}
Object.assign(__ds_scope, { Hero });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Hero.jsx", error: String((e && e.message) || e) }); }

// components/marketing/IndustryCard.jsx
try { (() => {
function IndustryCard({
  icon,
  name,
  description,
  stat,
  statLabel,
  href,
  onClick,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href || "#",
    onClick: onClick,
    className: ["c4t-card-hover", className].filter(Boolean).join(" "),
    style: {
      display: "flex",
      flexDirection: "column",
      overflow: "hidden",
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
      color: "inherit",
      height: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    ratio: "16 / 10",
    label: name,
    icon: icon || "image",
    tone: "sunken",
    radius: "0",
    style: {
      borderWidth: 0,
      borderBottom: "1px solid var(--border-subtle)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-card-padding)",
      display: "flex",
      flexDirection: "column",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--type-heading-sm-size)",
      letterSpacing: "var(--type-heading-sm-tracking)"
    }
  }, name), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: "var(--type-body-sm-size)",
      lineHeight: 1.55,
      color: "var(--text-secondary)"
    }
  }, description) : null, stat ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      paddingTop: 14,
      borderTop: "1px solid var(--border-subtle)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 24,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "-0.6px",
      fontVariantNumeric: "tabular-nums"
    }
  }, stat), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, statLabel)) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginTop: "auto",
      paddingTop: 20,
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-brand)"
    }
  }, "Industry overview ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15
  }))));
}
Object.assign(__ds_scope, { IndustryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/IndustryCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PricingTable.jsx
try { (() => {
function PricingTable({
  plans = [],
  note,
  onSelect,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: ["c4t-pricing-grid", className].filter(Boolean).join(" "),
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${plans.length || 1}, minmax(0,1fr))`,
      gap: 20,
      alignItems: "stretch",
      ...style
    }
  }, plans.map(plan => {
    const hot = plan.highlighted;
    return /*#__PURE__*/React.createElement("div", {
      key: plan.name,
      style: {
        display: "flex",
        flexDirection: "column",
        padding: "var(--space-card-padding-lg)",
        background: hot ? "var(--surface-inverse)" : "var(--surface-canvas)",
        color: hot ? "var(--text-inverse)" : "var(--text-primary)",
        border: `1px solid ${hot ? "var(--surface-inverse)" : "var(--border-default)"}`,
        borderRadius: "var(--radius-panel)",
        boxShadow: hot ? "var(--shadow-lg)" : "none"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10,
        minHeight: 26
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--type-heading-sm-size)",
        fontWeight: "var(--fw-semibold)"
      }
    }, plan.name), plan.badge ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
      tone: hot ? "inverse" : "brand"
    }, plan.badge) : null), /*#__PURE__*/React.createElement("p", {
      style: {
        marginTop: 8,
        fontSize: "var(--type-body-sm-size)",
        color: hot ? "var(--text-inverse-muted)" : "var(--text-secondary)",
        minHeight: 44
      }
    }, plan.description), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 20,
        display: "flex",
        alignItems: "baseline",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 40,
        fontWeight: "var(--fw-semibold)",
        letterSpacing: "-1.6px",
        fontVariantNumeric: "tabular-nums"
      }
    }, plan.price), plan.period ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--type-body-sm-size)",
        color: hot ? "var(--text-inverse-muted)" : "var(--text-muted)"
      }
    }, plan.period) : null), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
      variant: hot ? "inverse" : "secondary",
      fullWidth: true,
      onClick: () => onSelect && onSelect(plan.name)
    }, plan.cta || "Talk to sales")), plan.featuresLabel ? /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: 24,
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: hot ? "var(--text-inverse-muted)" : "var(--text-muted)"
      }
    }, plan.featuresLabel) : null, /*#__PURE__*/React.createElement("ul", {
      style: {
        listStyle: "none",
        margin: "14px 0 0",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: 10
      }
    }, (plan.features || []).map(f => /*#__PURE__*/React.createElement("li", {
      key: f,
      style: {
        display: "flex",
        gap: 10,
        fontSize: "var(--type-body-sm-size)",
        lineHeight: 1.5,
        color: hot ? "var(--text-inverse-muted)" : "var(--text-secondary)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "check",
      size: 16,
      style: {
        color: hot ? "var(--coral-400)" : "var(--teal-500)",
        marginTop: 3,
        flex: "none"
      }
    }), f))));
  }), note ? /*#__PURE__*/React.createElement("p", {
    style: {
      gridColumn: "1 / -1",
      marginTop: 8,
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { PricingTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PricingTable.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ResourceCard.jsx
try { (() => {
const TYPE_ICON = {
  Article: "newspaper",
  Guide: "book-open",
  Webinar: "video",
  Report: "file-text",
  "Case study": "trending-up",
  Podcast: "mic"
};
function ResourceCard({
  type = "Article",
  title,
  description,
  readTime,
  date,
  author,
  layout = "vertical",
  href,
  onClick,
  style,
  className
}) {
  const horizontal = layout === "horizontal";
  return /*#__PURE__*/React.createElement("a", {
    href: href || "#",
    onClick: onClick,
    className: ["c4t-card-hover", horizontal ? "c4t-resource-horizontal" : null, className].filter(Boolean).join(" "),
    style: {
      display: horizontal ? "grid" : "flex",
      gridTemplateColumns: horizontal ? "260px 1fr" : undefined,
      flexDirection: horizontal ? undefined : "column",
      gap: horizontal ? 24 : 0,
      overflow: "hidden",
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
      color: "inherit",
      height: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Media, {
    ratio: horizontal ? "4 / 3" : "16 / 9",
    label: type,
    icon: TYPE_ICON[type] || "file-text",
    tone: "sunken",
    radius: "0",
    style: {
      borderWidth: 0,
      borderRight: horizontal ? "1px solid var(--border-subtle)" : "none",
      borderBottom: horizontal ? "none" : "1px solid var(--border-subtle)",
      height: horizontal ? "100%" : undefined
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: horizontal ? "20px 24px 20px 0" : "var(--space-card-padding)",
      display: "flex",
      flexDirection: "column",
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: "var(--text-brand)"
    }
  }, type, date ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      letterSpacing: "0.06em"
    }
  }, date) : null), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 10,
      fontSize: "var(--type-heading-sm-size)",
      lineHeight: 1.35,
      letterSpacing: "var(--type-heading-sm-tracking)",
      textWrap: "pretty"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: "var(--type-body-sm-size)",
      lineHeight: 1.55,
      color: "var(--text-secondary)"
    }
  }, description) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "auto",
      paddingTop: 18,
      display: "flex",
      alignItems: "center",
      gap: 10,
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)"
    }
  }, author ? /*#__PURE__*/React.createElement("span", null, author) : null, author && readTime ? /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\xB7") : null, readTime ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "clock",
    size: 13
  }), readTime) : null)));
}
Object.assign(__ds_scope, { ResourceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ResourceCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Section.jsx
try { (() => {
const TONES = {
  canvas: {
    background: "var(--surface-canvas)",
    color: "var(--text-primary)"
  },
  sunken: {
    background: "var(--surface-sunken)",
    color: "var(--text-primary)"
  },
  inverse: {
    background: "var(--surface-inverse)",
    color: "var(--text-inverse)"
  },
  brand: {
    background: "var(--surface-brand-subtle)",
    color: "var(--text-primary)"
  }
};
function Section({
  tone = "canvas",
  compact,
  divider,
  id,
  children,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: id,
    className: className,
    style: {
      paddingBlock: compact ? "var(--space-section-y-compact)" : "var(--space-section-y)",
      borderTop: divider ? "1px solid var(--border-subtle)" : undefined,
      ...TONES[tone],
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-max)",
      margin: "0 auto",
      paddingInline: "var(--container-gutter)"
    }
  }, children));
}
Object.assign(__ds_scope, { Section });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Section.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeader.jsx
try { (() => {
function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "default",
  actions,
  style,
  className
}) {
  const inverse = tone === "inverse";
  return /*#__PURE__*/React.createElement("div", {
    className: className,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      maxWidth: align === "center" ? 760 : 720,
      marginInline: align === "center" ? "auto" : 0,
      textAlign: align,
      alignItems: align === "center" ? "center" : "flex-start",
      ...style
    }
  }, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--type-eyebrow-size)",
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "var(--type-eyebrow-tracking)",
      textTransform: "uppercase",
      color: inverse ? "var(--coral-400)" : "var(--text-brand)"
    }
  }, eyebrow) : null, title ? /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-display-md-size)",
      lineHeight: "var(--type-display-md-line)",
      letterSpacing: "var(--type-display-md-tracking)",
      color: inverse ? "var(--text-inverse)" : "var(--text-primary)",
      textWrap: "balance"
    }
  }, title) : null, description ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--type-body-lg-size)",
      lineHeight: "var(--type-body-lg-line)",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-secondary)"
    }
  }, description) : null, actions ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 12,
      marginTop: 6
    }
  }, actions) : null);
}
Object.assign(__ds_scope, { SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/marketing/ServiceCard.jsx
try { (() => {
function ServiceCard({
  icon,
  eyebrow,
  title,
  description,
  points = [],
  cta = "Explore",
  badge,
  onClick,
  href,
  style,
  className
}) {
  return /*#__PURE__*/React.createElement("a", {
    href: href || "#",
    onClick: onClick,
    className: ["c4t-card-hover", className].filter(Boolean).join(" "),
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "var(--space-card-padding-lg)",
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      textDecoration: "none",
      color: "inherit",
      height: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginBottom: 16
    }
  }, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 24,
    style: {
      color: "var(--coral-500)"
    }
  }) : null, eyebrow ? /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, eyebrow) : null, badge ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "brand"
  }, badge)) : null), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontSize: "var(--type-heading-md-size)",
      lineHeight: "var(--type-heading-md-line)",
      letterSpacing: "var(--type-heading-md-tracking)"
    }
  }, title), description ? /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: "var(--type-body-sm-size)",
      lineHeight: 1.6,
      color: "var(--text-secondary)"
    }
  }, description) : null, points.length ? /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: "18px 0 0",
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 8
    }
  }, points.map(p => /*#__PURE__*/React.createElement("li", {
    key: p,
    style: {
      display: "flex",
      gap: 8,
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-secondary)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16,
    style: {
      color: "var(--teal-500)",
      marginTop: 3
    }
  }), p))) : null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginTop: "auto",
      paddingTop: 24,
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-brand)"
    }
  }, cta, " ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 15
  })));
}
Object.assign(__ds_scope, { ServiceCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/ServiceCard.jsx", error: String((e && e.message) || e) }); }

// components/marketing/StatBlock.jsx
try { (() => {
function StatBlock({
  stats = [],
  tone = "canvas",
  columns,
  divided = true,
  align = "left",
  style,
  className
}) {
  const inverse = tone === "inverse";
  const cols = columns || Math.min(stats.length, 4) || 1;
  return /*#__PURE__*/React.createElement("div", {
    className: ["c4t-stat-grid", className].filter(Boolean).join(" "),
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0,1fr))`,
      gap: divided ? 0 : 32,
      textAlign: align,
      ...style
    }
  }, stats.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.label,
    style: {
      padding: divided ? "8px 32px" : 0,
      borderLeft: divided && i > 0 ? `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-default)"}` : "none",
      paddingLeft: divided && i === 0 ? 0 : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-metric-size)",
      lineHeight: "var(--type-metric-line)",
      letterSpacing: "var(--type-metric-tracking)",
      fontWeight: "var(--fw-semibold)",
      fontVariantNumeric: "tabular-nums",
      color: inverse ? "var(--text-inverse)" : "var(--text-primary)"
    },
    className: "c4t-stat-value"
  }, s.value), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)",
      color: inverse ? "var(--text-inverse)" : "var(--text-primary)"
    }
  }, s.label), s.detail ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 4,
      fontSize: "var(--type-caption-size)",
      color: inverse ? "var(--text-inverse-muted)" : "var(--text-muted)"
    }
  }, s.detail) : null)));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Testimonial.jsx
try { (() => {
function Testimonial({
  quote,
  name,
  role,
  company,
  metric,
  metricLabel,
  tone = "canvas",
  variant = "card",
  style,
  className
}) {
  const inverse = tone === "inverse";
  const fg = inverse ? "var(--text-inverse)" : "var(--text-primary)";
  const muted = inverse ? "var(--text-inverse-muted)" : "var(--text-muted)";
  const isFeature = variant === "feature";
  return /*#__PURE__*/React.createElement("figure", {
    className: className,
    style: {
      margin: 0,
      padding: isFeature ? 0 : "var(--space-card-padding-lg)",
      background: isFeature ? "transparent" : inverse ? "var(--surface-inverse-raised)" : "var(--surface-canvas)",
      border: isFeature ? "none" : `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-default)"}`,
      borderRadius: "var(--radius-card)",
      display: "flex",
      flexDirection: "column",
      height: "100%",
      ...style
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "quote",
    size: isFeature ? 28 : 20,
    style: {
      color: "var(--coral-500)",
      marginBottom: 16
    }
  }), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontSize: isFeature ? "var(--type-heading-md-size)" : "var(--type-body-md-size)",
      lineHeight: isFeature ? 1.45 : 1.6,
      letterSpacing: isFeature ? "-0.25px" : 0,
      color: fg,
      textWrap: "pretty"
    }
  }, quote), metric ? /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      paddingTop: 20,
      borderTop: `1px solid ${inverse ? "var(--border-inverse)" : "var(--border-subtle)"}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 32,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: "-1px",
      color: fg,
      fontVariantNumeric: "tabular-nums"
    }
  }, metric), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: muted,
      marginTop: 2
    }
  }, metricLabel)) : null, /*#__PURE__*/React.createElement("figcaption", {
    style: {
      marginTop: "auto",
      paddingTop: 24,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 40,
      height: 40,
      flex: "none",
      borderRadius: 999,
      background: inverse ? "rgb(255 255 255 / 0.1)" : "var(--surface-muted)",
      color: inverse ? "var(--text-inverse)" : "var(--text-secondary)",
      fontSize: 14,
      fontWeight: "var(--fw-semibold)"
    }
  }, (name || "").split(" ").map(w => w[0]).slice(0, 2).join("")), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)",
      color: fg
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-caption-size)",
      color: muted
    }
  }, role, company ? `, ${company}` : ""))));
}
Object.assign(__ds_scope, { Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function Breadcrumb({
  items = [],
  tone = "default",
  onNavigate,
  style,
  className
}) {
  const muted = tone === "inverse" ? "var(--text-inverse-muted)" : "var(--text-muted)";
  const strong = tone === "inverse" ? "var(--text-inverse)" : "var(--text-primary)";
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Breadcrumb",
    className: className,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      flexWrap: "wrap",
      fontSize: "var(--type-body-sm-size)",
      ...style
    }
  }, items.map((item, i) => {
    const label = typeof item === "string" ? item : item.label;
    const last = i === items.length - 1;
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: label
    }, last ? /*#__PURE__*/React.createElement("span", {
      "aria-current": "page",
      style: {
        color: strong,
        fontWeight: "var(--fw-medium)"
      }
    }, label) : /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onNavigate && onNavigate(label);
      },
      style: {
        color: muted,
        textDecoration: "none"
      }
    }, label), !last ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "chevron-right",
      size: 14,
      style: {
        color: muted,
        opacity: 0.7
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Footer.jsx
try { (() => {
const DEFAULT_FOOTER_COLUMNS = [{
  title: "Platform",
  links: ["AI test agents", "Crowd test network", "Test orchestration", "Coverage analytics", "Integrations"]
}, {
  title: "Solutions",
  links: ["Functional & regression", "AI product evaluation", "Accessibility", "Performance & load", "Localization", "Security assurance"]
}, {
  title: "Industries",
  links: ["Financial services", "Healthcare", "Retail & e-commerce", "Telecom & media", "B2B SaaS", "Public sector"]
}, {
  title: "Resources",
  links: ["Blog", "Case studies", "Customer stories", "Guides", "Webinars", "FAQs"]
}, {
  title: "Company",
  links: ["About us", "Careers", "Contact", "Trust & security", "Partners"]
}];
function Footer({
  columns = DEFAULT_FOOTER_COLUMNS,
  onNavigate,
  newsletter = true,
  style,
  className
}) {
  const go = label => e => {
    e.preventDefault();
    if (onNavigate) onNavigate(label);
  };
  return /*#__PURE__*/React.createElement("footer", {
    className: className,
    style: {
      background: "var(--surface-inverse)",
      color: "var(--text-inverse)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "64px var(--container-gutter) 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(240px, 1fr) 3fr",
      gap: 48
    },
    className: "c4t-footer-top"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 22,
    tone: "inverse",
    href: "#",
    onClick: go("Home")
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      maxWidth: 300,
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-inverse-muted)"
    }
  }, "Digital quality engineering that pairs AI agents with a vetted global testing community."), newsletter ? /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      marginTop: 24,
      display: "flex",
      gap: 8,
      maxWidth: 340
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Input, {
    type: "email",
    placeholder: "Work email",
    "aria-label": "Work email",
    style: {
      background: "var(--surface-inverse-raised)",
      border: "1px solid var(--border-inverse)",
      color: "var(--text-inverse)",
      minHeight: 44
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    type: "submit",
    variant: "inverse",
    size: "md"
  }, "Subscribe")) : null), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
      gap: 32
    }
  }, columns.map(col => /*#__PURE__*/React.createElement("div", {
    key: col.title
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-inverse-muted)",
      marginBottom: 14
    }
  }, col.title), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, col.links.map(l => /*#__PURE__*/React.createElement("li", {
    key: l
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go(l),
    className: "c4t-inverse-link",
    style: {
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-inverse-muted)",
      textDecoration: "none"
    }
  }, l)))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      paddingTop: 24,
      borderTop: "1px solid var(--border-inverse)",
      display: "flex",
      flexWrap: "wrap",
      gap: 16,
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 20,
      fontSize: "var(--type-caption-size)",
      color: "var(--text-inverse-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Crowd4Test Ltd."), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go("Privacy"),
    className: "c4t-inverse-link",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go("Terms"),
    className: "c4t-inverse-link",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: go("Accessibility"),
    className: "c4t-inverse-link",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, "Accessibility statement"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)"
    }
  }, "SOC 2 Type II \xB7 ISO 27001")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6
    }
  }, ["linkedin", "github", "youtube", "rss"].map(n => /*#__PURE__*/React.createElement("a", {
    key: n,
    href: "#",
    onClick: go(n),
    "aria-label": n,
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      borderRadius: "var(--radius-sm)",
      border: "1px solid var(--border-inverse)",
      color: "var(--text-inverse-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: n,
    size: 16
  })))))));
}
Object.assign(__ds_scope, { DEFAULT_FOOTER_COLUMNS, Footer });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Footer.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Pagination.jsx
try { (() => {
function Pagination({
  page = 1,
  pageCount = 1,
  onChange,
  style,
  className
}) {
  const pages = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= 1) pages.push(i);else if (pages[pages.length - 1] !== "…") pages.push("…");
  }
  const cell = {
    minWidth: 40,
    height: 40,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 10px",
    borderRadius: "var(--radius-sm)",
    border: "1px solid transparent",
    background: "transparent",
    fontSize: "var(--type-body-sm-size)",
    fontWeight: "var(--fw-medium)",
    color: "var(--text-secondary)",
    cursor: "pointer",
    transition: "var(--transition-control)"
  };
  return /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Pagination",
    className: className,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "c4t-page-btn",
    style: cell,
    disabled: page === 1,
    onClick: () => onChange && onChange(page - 1),
    "aria-label": "Previous page"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-left",
    size: 16
  })), pages.map((p, i) => p === "…" ? /*#__PURE__*/React.createElement("span", {
    key: `gap${i}`,
    style: {
      ...cell,
      cursor: "default",
      color: "var(--text-disabled)"
    }
  }, "\u2026") : /*#__PURE__*/React.createElement("button", {
    key: p,
    type: "button",
    className: "c4t-page-btn",
    "aria-current": p === page ? "page" : undefined,
    onClick: () => onChange && onChange(p),
    style: {
      ...cell,
      background: p === page ? "var(--ink-950)" : "transparent",
      color: p === page ? "var(--text-inverse)" : cell.color
    }
  }, p)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "c4t-page-btn",
    style: cell,
    disabled: page === pageCount,
    onClick: () => onChange && onChange(page + 1),
    "aria-label": "Next page"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16
  })));
}
Object.assign(__ds_scope, { Pagination });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Pagination.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function Tabs({
  items = [],
  value,
  onChange,
  variant = "underline",
  style,
  className
}) {
  const isPill = variant === "pill";
  return /*#__PURE__*/React.createElement("div", {
    role: "tablist",
    className: className,
    style: {
      display: "flex",
      gap: isPill ? 6 : 24,
      borderBottom: isPill ? "none" : "1px solid var(--border-default)",
      background: isPill ? "var(--surface-sunken)" : "transparent",
      padding: isPill ? 4 : 0,
      borderRadius: isPill ? "var(--radius-full)" : 0,
      width: isPill ? "fit-content" : undefined,
      overflowX: "auto",
      ...style
    }
  }, items.map(item => {
    const key = typeof item === "string" ? item : item.value;
    const label = typeof item === "string" ? item : item.label;
    const on = value === key;
    return /*#__PURE__*/React.createElement("button", {
      key: key,
      role: "tab",
      type: "button",
      "aria-selected": on,
      className: "c4t-tab",
      onClick: () => onChange && onChange(key),
      style: {
        border: "none",
        cursor: "pointer",
        whiteSpace: "nowrap",
        fontSize: "var(--type-body-sm-size)",
        fontWeight: "var(--fw-medium)",
        transition: "var(--transition-control)",
        ...(isPill ? {
          padding: "8px 16px",
          borderRadius: "var(--radius-full)",
          background: on ? "var(--surface-canvas)" : "transparent",
          color: on ? "var(--text-primary)" : "var(--text-muted)",
          boxShadow: on ? "var(--shadow-xs)" : "none"
        } : {
          padding: "0 0 12px",
          background: "transparent",
          color: on ? "var(--text-primary)" : "var(--text-muted)",
          borderBottom: `2px solid ${on ? "var(--coral-500)" : "transparent"}`,
          marginBottom: -1
        })
      }
    }, label);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopNav.jsx
try { (() => {
const DEFAULT_NAV = [{
  label: "Platform",
  columns: [{
    title: "Test execution",
    links: [{
      icon: "bot",
      label: "AI test agents",
      desc: "Autonomous exploration and regression runs"
    }, {
      icon: "users",
      label: "Crowd test network",
      desc: "42,000 vetted testers in 96 countries"
    }, {
      icon: "workflow",
      label: "Test orchestration",
      desc: "One queue for agents and humans"
    }]
  }, {
    title: "Evidence",
    links: [{
      icon: "line-chart",
      label: "Coverage analytics",
      desc: "Where risk actually lives"
    }, {
      icon: "clipboard-check",
      label: "Human review layer",
      desc: "Judgment on every AI verdict"
    }, {
      icon: "plug",
      label: "Integrations",
      desc: "Jira, GitHub, Azure DevOps, Slack"
    }]
  }],
  feature: {
    badge: "New",
    title: "Agent Evaluation Suite",
    desc: "Grade LLM behaviour against a human rubric.",
    cta: "See how it works"
  }
}, {
  label: "Solutions",
  columns: [{
    title: "By discipline",
    links: [{
      icon: "test-tube-diagonal",
      label: "Functional & regression",
      desc: "Release-gating suites on every build"
    }, {
      icon: "sparkles",
      label: "AI product evaluation",
      desc: "Red-teaming, hallucination and tone checks"
    }, {
      icon: "accessibility",
      label: "Accessibility (WCAG 2.2)",
      desc: "Audits with assistive-tech users"
    }]
  }, {
    title: "By outcome",
    links: [{
      icon: "gauge",
      label: "Performance & load",
      desc: "Find the ceiling before your users do"
    }, {
      icon: "globe",
      label: "Localization",
      desc: "In-market testers, 38 languages"
    }, {
      icon: "shield-check",
      label: "Security assurance",
      desc: "OWASP-aligned validation"
    }]
  }]
}, {
  label: "Industries",
  columns: [{
    title: "Regulated",
    links: [{
      icon: "landmark",
      label: "Financial services",
      desc: "SOC 2, PCI DSS, audit-ready evidence"
    }, {
      icon: "heart-pulse",
      label: "Healthcare & life sciences",
      desc: "HIPAA-safe test data handling"
    }, {
      icon: "building-2",
      label: "Public sector",
      desc: "Section 508 and WCAG conformance"
    }]
  }, {
    title: "High velocity",
    links: [{
      icon: "shopping-cart",
      label: "Retail & e-commerce",
      desc: "Peak-season readiness programmes"
    }, {
      icon: "radio-tower",
      label: "Telecom & media",
      desc: "Device-matrix coverage at scale"
    }, {
      icon: "cloud",
      label: "B2B SaaS",
      desc: "Continuous regression for weekly releases"
    }]
  }]
}, {
  label: "Services",
  columns: [{
    title: "Engagements",
    links: [{
      icon: "users-round",
      label: "Managed QE pods",
      desc: "A dedicated team, embedded in your sprints"
    }, {
      icon: "flask-conical",
      label: "AI testing services",
      desc: "Model, agent and RAG evaluation"
    }, {
      icon: "code",
      label: "Test automation build",
      desc: "Playwright, Appium, Cypress"
    }, {
      icon: "compass",
      label: "QE advisory",
      desc: "Maturity assessment and roadmap"
    }]
  }]
}, {
  label: "Resources",
  columns: [{
    title: "Learn",
    links: [{
      icon: "newspaper",
      label: "Blog",
      desc: "Field notes from the QE frontline"
    }, {
      icon: "book-open",
      label: "Guides & playbooks",
      desc: "Practical, download-free"
    }, {
      icon: "circle-help",
      label: "FAQs",
      desc: "How engagements actually work"
    }]
  }, {
    title: "Proof",
    links: [{
      icon: "file-text",
      label: "Case studies",
      desc: "Measured before and after"
    }, {
      icon: "quote",
      label: "Customer stories",
      desc: "In their words"
    }, {
      icon: "video",
      label: "Webinars",
      desc: "Live and on demand"
    }]
  }]
}, {
  label: "Pricing",
  href: "#pricing"
}, {
  label: "Company",
  columns: [{
    title: "Crowd4Test",
    links: [{
      icon: "info",
      label: "About us",
      desc: "Why we pair agents with people"
    }, {
      icon: "briefcase",
      label: "Careers",
      desc: "We're hiring across QE and ML"
    }, {
      icon: "mail",
      label: "Contact",
      desc: "Talk to a quality engineer"
    }]
  }]
}];
function TopNav({
  items = DEFAULT_NAV,
  active,
  onNavigate,
  sticky = true,
  announcement,
  style,
  className
}) {
  const [open, setOpen] = React.useState(null);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const go = label => e => {
    e.preventDefault();
    setOpen(null);
    setMobileOpen(false);
    if (onNavigate) onNavigate(label);
  };
  return /*#__PURE__*/React.createElement("header", {
    className: className,
    onMouseLeave: () => setOpen(null),
    style: {
      position: sticky ? "sticky" : "relative",
      top: 0,
      zIndex: 50,
      background: "var(--surface-canvas)",
      borderBottom: "1px solid var(--border-subtle)",
      ...style
    }
  }, announcement ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-inverse)",
      color: "var(--text-inverse)",
      fontSize: "var(--type-body-sm-size)",
      textAlign: "center",
      padding: "9px 16px"
    }
  }, announcement) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-wide)",
      margin: "0 auto",
      padding: "0 var(--container-gutter)",
      height: 72,
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    size: 21,
    href: "#",
    onClick: go("Home")
  }), /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Primary",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      marginRight: "auto"
    },
    className: "c4t-nav-desktop"
  }, items.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: item.href || "#",
    onClick: go(item.label),
    onMouseEnter: () => setOpen(item.columns ? item.label : null),
    className: "c4t-navlink",
    "aria-expanded": item.columns ? open === item.label : undefined,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "8px 12px",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)",
      color: active === item.label || open === item.label ? "var(--text-primary)" : "var(--text-secondary)",
      textDecoration: "none",
      whiteSpace: "nowrap"
    }
  }, item.label, item.columns ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14,
    style: {
      opacity: 0.6,
      transform: open === item.label ? "rotate(180deg)" : "none",
      transition: "transform var(--duration-fast) var(--ease-standard)"
    }
  }) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    },
    className: "c4t-nav-desktop"
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    size: "sm",
    href: "#",
    onClick: go("Sign in")
  }, "Sign in"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    size: "sm",
    href: "#",
    onClick: go("Contact")
  }, "Book a demo")), /*#__PURE__*/React.createElement("span", {
    className: "c4t-nav-mobile",
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: mobileOpen ? "x" : "menu",
    label: "Menu",
    onClick: () => setMobileOpen(!mobileOpen)
  }))), open ? (() => {
    const item = items.find(i => i.label === open);
    if (!item || !item.columns) return null;
    return /*#__PURE__*/React.createElement("div", {
      onMouseEnter: () => setOpen(open),
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        background: "var(--surface-canvas)",
        borderTop: "1px solid var(--border-subtle)",
        borderBottom: "1px solid var(--border-default)",
        boxShadow: "var(--shadow-md)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--container-wide)",
        margin: "0 auto",
        padding: "28px var(--container-gutter) 32px",
        display: "grid",
        gridTemplateColumns: `repeat(${item.columns.length}, minmax(0,1fr))${item.feature ? " 320px" : ""}`,
        gap: 32
      }
    }, item.columns.map(col => /*#__PURE__*/React.createElement("div", {
      key: col.title
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--text-muted)",
        marginBottom: 12
      }
    }, col.title), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: 2
      }
    }, col.links.map(l => /*#__PURE__*/React.createElement("a", {
      key: l.label,
      href: "#",
      onClick: go(l.label),
      className: "c4t-megalink",
      style: {
        display: "flex",
        gap: 12,
        padding: "10px 12px",
        margin: "0 -12px",
        borderRadius: "var(--radius-sm)",
        textDecoration: "none",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: l.icon,
      size: 18,
      style: {
        color: "var(--coral-500)",
        marginTop: 2
      }
    }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: "var(--type-body-sm-size)",
        fontWeight: "var(--fw-medium)",
        color: "var(--text-primary)"
      }
    }, l.label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "block",
        fontSize: "var(--type-caption-size)",
        color: "var(--text-muted)",
        marginTop: 2
      }
    }, l.desc))))))), item.feature ? /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--surface-sunken)",
        border: "1px solid var(--border-subtle)",
        borderRadius: "var(--radius-card)",
        padding: 20
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-flex",
        height: 22,
        alignItems: "center",
        padding: "0 8px",
        borderRadius: 999,
        background: "var(--surface-brand-subtle)",
        color: "var(--text-brand)",
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase"
      }
    }, item.feature.badge), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: "var(--type-heading-sm-size)",
        fontWeight: "var(--fw-semibold)",
        marginTop: 12,
        letterSpacing: "-0.1px"
      }
    }, item.feature.title), /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "var(--type-body-sm-size)",
        color: "var(--text-secondary)",
        marginTop: 6
      }
    }, item.feature.desc), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: go(item.feature.cta),
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        marginTop: 14,
        fontSize: "var(--type-body-sm-size)",
        fontWeight: "var(--fw-medium)",
        color: "var(--text-brand)",
        textDecoration: "none"
      }
    }, item.feature.cta, " ", /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: "arrow-right",
      size: 15
    }))) : null));
  })() : null, mobileOpen ? /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--border-subtle)",
      padding: "12px var(--container-gutter) 24px",
      display: "flex",
      flexDirection: "column",
      gap: 2,
      maxHeight: "70vh",
      overflowY: "auto"
    }
  }, items.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: "#",
    onClick: go(item.label),
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "13px 0",
      borderBottom: "1px solid var(--border-subtle)",
      fontSize: "var(--type-body-md-size)",
      fontWeight: "var(--fw-medium)",
      color: "var(--text-primary)",
      textDecoration: "none"
    }
  }, item.label, item.columns ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-right",
    size: 16,
    style: {
      color: "var(--text-muted)"
    }
  }) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "primary",
    fullWidth: true,
    href: "#",
    onClick: go("Contact")
  }, "Book a demo"), /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "secondary",
    fullWidth: true,
    href: "#",
    onClick: go("Sign in")
  }, "Sign in"))) : null);
}
Object.assign(__ds_scope, { DEFAULT_NAV, TopNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopNav.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/App.jsx
try { (() => {
const {
  TopNav,
  Footer
} = window.Crowd4TestDesignSystem_772017;
const PAGE_KEYS = ["Home", "Platform", "Solutions", "Industries", "AI testing services", "Case studies", "Customer stories", "Resources", "Blog", "Blog post", "FAQs", "Pricing", "About", "Careers", "Contact", "Thank you", "404"];
const ALIASES = {
  "Services": "AI testing services",
  "Company": "About",
  "About us": "About",
  "Book a demo": "Contact",
  "Sign in": "Contact",
  "Talk to an engineer": "Contact",
  "Talk to sales": "Contact",
  "Get in touch": "Contact",
  "Subscribe": "Thank you",
  "See open roles": "Careers"
};
function pageComponent(key) {
  return {
    "Home": window.HomePage,
    "Platform": window.PlatformPage,
    "Solutions": window.SolutionsPage,
    "Industries": window.IndustriesPage,
    "AI testing services": window.AiTestingPage,
    "Case studies": window.CaseStudiesPage,
    "Customer stories": window.CustomerStoriesPage,
    "Resources": window.ResourcesPage,
    "Blog": window.BlogPage,
    "Blog post": window.BlogPostPage,
    "FAQs": window.FaqPage,
    "Pricing": window.PricingPage,
    "About": window.AboutPage,
    "Careers": window.CareersPage,
    "Contact": window.ContactPage,
    "Thank you": window.ThankYouPage,
    "404": window.NotFoundPage
  }[key];
}
const NAV_SECTION = {
  Platform: "Platform",
  Solutions: "Solutions",
  Industries: "Industries",
  "AI testing services": "Services",
  Pricing: "Pricing",
  Resources: "Resources",
  Blog: "Resources",
  "Blog post": "Resources",
  FAQs: "Resources",
  "Case studies": "Resources",
  "Customer stories": "Resources",
  About: "Company",
  Careers: "Company",
  Contact: "Company"
};
function App() {
  const [page, setPage] = React.useState("Home");
  const go = React.useCallback(label => {
    const resolved = ALIASES[label] || (PAGE_KEYS.indexOf(label) > -1 ? label : "404");
    setPage(resolved);
    window.scrollTo(0, 0);
  }, []);
  const Current = pageComponent(page) || window.NotFoundPage;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(TopNav, {
    active: NAV_SECTION[page],
    onNavigate: go,
    announcement: "State of AI Quality 2026 \u2014 the benchmark report is live"
  }), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Current, {
    go: go
  })), /*#__PURE__*/React.createElement(Footer, {
    onNavigate: go
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/CompanyPages.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Section,
  SectionHeader,
  FeatureCard,
  StatBlock,
  ContactForm,
  CtaBanner,
  Button,
  Breadcrumb,
  Media,
  Icon,
  Badge,
  LogoCloud,
  Testimonial,
  Tag
} = window.Crowd4TestDesignSystem_772017;
function AboutPage({
  go
}) {
  const d = window.C4T;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "About us"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24,
      maxWidth: 820
    },
    eyebrow: "About us",
    title: "We started because a model marked its own exam and passed",
    description: "Crowd4Test was founded in 2019 by three quality engineers who kept finding the same gap: automation that could run everything, and nobody left who could say whether it mattered."
  })), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(Media, {
    ratio: "21 / 9",
    label: "The team, Lisbon offsite",
    icon: "users"
  })), /*#__PURE__*/React.createElement(Section, {
    tone: "inverse",
    compact: true
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "inverse",
    stats: [{
      value: "2019",
      label: "Founded",
      detail: "London and Lisbon"
    }, {
      value: "214",
      label: "People on staff"
    }, {
      value: "42,000",
      label: "Community testers"
    }, {
      value: "96",
      label: "Countries covered"
    }]
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "How we work",
    title: "Four commitments we do not trade away"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-4"
  }, d.values.map(v => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: v.title
  }, v))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Leadership",
    title: "Who runs this"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-4"
  }, [["Sofia Andrade", "Chief Executive"], ["Tom Fielding", "Chief Technology Officer"], ["Priya Raman", "VP Quality Engineering"], ["Nadia Haddad", "VP Community"]].map(([n, r]) => /*#__PURE__*/React.createElement("div", {
    key: n
  }, /*#__PURE__*/React.createElement(Media, {
    ratio: "1 / 1",
    label: n,
    icon: "user"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 14,
      fontSize: "var(--type-body-md-size)",
      fontWeight: "var(--fw-medium)"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-muted)"
    }
  }, r))))), /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(LogoCloud, {
    label: "Working with",
    logos: d.logos
  })), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Come and see how we work.",
    primaryCta: "Book a demo",
    secondaryCta: "See open roles",
    onAction: l => go(l === "See open roles" ? "Careers" : "Contact")
  }));
}
function CareersPage({
  go
}) {
  const d = window.C4T;
  const [team, setTeam] = React.useState("All");
  const teams = ["All", "Delivery", "AI Testing", "Crowd Network", "Platform", "Revenue"];
  const roles = team === "All" ? d.roles : d.roles.filter(r => r.team === team);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Careers"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24
    },
    eyebrow: "Careers",
    title: "Testing is a craft. We staff it like one.",
    description: "Remote-first across the UK and EU, with hubs in London and Lisbon. Every engineer here reviews real findings, including the leadership team."
  })), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 20
    },
    className: "c4t-grid-4"
  }, [["heart-handshake", "Four-day fortnight of focus time"], ["globe", "Remote-first, UK & EU"], ["graduation-cap", "£2,000 learning budget"], ["baby", "Six months parental leave"]].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      padding: 20,
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    style: {
      color: "var(--coral-500)",
      marginTop: 2
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)"
    }
  }, t))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Open roles",
    title: `${roles.length} open positions`
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      margin: "28px 0 24px"
    }
  }, teams.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    active: team === t,
    onClick: () => setTeam(t)
  }, t))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "var(--surface-canvas)",
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)",
      overflow: "hidden"
    }
  }, roles.map((r, i) => /*#__PURE__*/React.createElement("a", {
    key: r.title,
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("Contact");
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      padding: "20px 24px",
      borderTop: i ? "1px solid var(--border-subtle)" : "none",
      textDecoration: "none",
      color: "inherit"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-body-md-size)",
      fontWeight: "var(--fw-medium)"
    }
  }, r.title), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)",
      marginTop: 2
    }
  }, r.team, " \xB7 ", r.location, " \xB7 ", r.type)), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right",
    size: 18,
    style: {
      color: "var(--text-brand)"
    }
  }))))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Nothing fits, but you're interested?",
    description: "Send us a note about what you'd want to work on. We read all of them.",
    primaryCta: "Get in touch",
    onAction: () => go("Contact")
  }));
}
function ContactPage({
  go
}) {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Contact"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 520px",
      gap: 64,
      alignItems: "start",
      marginTop: 28
    },
    className: "c4t-grid-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Book a demo",
    title: "Bring a build. Leave with findings.",
    description: "Thirty minutes with a quality engineer \u2014 not a qualification call. We'll look at your product, tell you what we'd test first and what a pilot would cost."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, [["clock", "Reply within one business day"], ["user-check", "You talk to an engineer, not an SDR"], ["file-check", "Scoped pilot proposal in 48 hours"], ["shield-check", "NDA before we look at anything"]].map(([i, t]) => /*#__PURE__*/React.createElement("div", {
    key: t,
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 18,
    style: {
      color: "var(--teal-500)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-md-size)",
      color: "var(--text-secondary)"
    }
  }, t)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      paddingTop: 28,
      borderTop: "1px solid var(--border-subtle)",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    }
  }, [["London", "18 Finsbury Square\nLondon EC2A 1AH"], ["Lisbon", "Rua da Prata 80\n1100-420 Lisboa"]].map(([c, a]) => /*#__PURE__*/React.createElement("div", {
    key: c
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, c), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-secondary)",
      whiteSpace: "pre-line"
    }
  }, a))))), /*#__PURE__*/React.createElement(ContactForm, {
    title: "Tell us what you're shipping",
    onSubmit: () => go("Thank you")
  }))));
}
function ThankYouPage({
  go
}) {
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingBlock: 140
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    size: 56,
    style: {
      color: "var(--teal-500)",
      margin: "0 auto 24px"
    }
  }), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontSize: "var(--type-display-lg-size)",
      lineHeight: "var(--type-display-lg-line)",
      letterSpacing: "var(--type-display-lg-tracking)"
    }
  }, "Thanks \u2014 that's landed with us"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: "var(--type-body-lg-size)",
      color: "var(--text-secondary)"
    }
  }, "A quality engineer will reply within one business day with a couple of times and a short list of what we'd want to look at first."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go("Resources"),
    iconRight: "arrow-right"
  }, "Read while you wait"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go("Home")
  }, "Back to home"))));
}
function NotFoundPage({
  go
}) {
  return /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingBlock: 140
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 620,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 13,
      fontWeight: 700,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--text-brand)"
    }
  }, "Error 404"), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 20,
      fontSize: "var(--type-display-lg-size)",
      lineHeight: "var(--type-display-lg-line)",
      letterSpacing: "var(--type-display-lg-tracking)"
    }
  }, "We test for this, you know"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 16,
      fontSize: "var(--type-body-lg-size)",
      color: "var(--text-secondary)"
    }
  }, "The page you asked for isn't here. Embarrassing for a quality company \u2014 the finding has been filed."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32,
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: () => go("Home"),
    iconRight: "arrow-right"
  }, "Back to home"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    onClick: () => go("Contact")
  }, "Report a problem"))));
}
Object.assign(window, {
  AboutPage,
  CareersPage,
  ContactPage,
  ThankYouPage,
  NotFoundPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/CompanyPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/HomePage.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Hero,
  Section,
  SectionHeader,
  FeatureCard,
  ServiceCard,
  IndustryCard,
  CaseStudyCard,
  StatBlock,
  LogoCloud,
  Testimonial,
  CtaBanner,
  CapabilitySection,
  Button,
  Badge,
  Icon,
  Media
} = window.Crowd4TestDesignSystem_772017;
function HomePage({
  go
}) {
  const d = window.C4T;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    eyebrow: "Digital quality engineering",
    title: "AI can't grade its own homework.",
    description: "Crowd4Test pairs autonomous test agents with 42,000 vetted human testers \u2014 so coverage and judgment arrive in the same report, on the same release.",
    primaryCta: "Book a demo",
    secondaryCta: "See the platform",
    bullets: ["Agents run overnight, people review by morning", "Findings land in your Jira, triaged", "Evidence your auditors accept"],
    trustLine: "SOC 2 Type II \xB7 ISO 27001 \xB7 GDPR",
    onAction: l => go(l === "See the platform" ? "Platform" : "Contact"),
    media: /*#__PURE__*/React.createElement(Media, {
      ratio: "4 / 3",
      label: "Coverage dashboard",
      icon: "layout-dashboard"
    })
  }), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    compact: true
  }, /*#__PURE__*/React.createElement(LogoCloud, {
    label: "Quality partners to",
    logos: d.logos
  })), /*#__PURE__*/React.createElement(Section, {
    tone: "inverse",
    compact: true
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "inverse",
    stats: d.heroStats
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "The platform",
    title: "Two testing engines, one queue",
    description: "Agents cover the volume. People cover the judgment. Neither one is asked to do the other's job."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-3"
  }, d.platform.map(f => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: f.title
  }, f, {
    onClick: e => {
      e.preventDefault();
      go("Platform");
    },
    href: "#"
  }))))), /*#__PURE__*/React.createElement(CapabilitySection, {
    eyebrow: "AI testing",
    title: "Agents that explore, people who judge",
    description: "Every AI verdict passes a human reviewer before it becomes a ticket. That is the whole thesis.",
    capabilities: d.capabilities
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Solutions",
    title: "Whatever quality means on your roadmap",
    description: "Six disciplines, one engagement model, one release gate.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => go("Solutions"),
      iconRight: "arrow-right"
    }, "All solutions")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-3"
  }, d.solutions.map(s => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: s.title
  }, s, {
    href: "#",
    onClick: e => {
      e.preventDefault();
      go("Solutions");
    }
  }))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Proof",
    title: "Measured before, measured after",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      onClick: () => go("Case studies"),
      iconRight: "arrow-right"
    }, "All case studies")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 44,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(CaseStudyCard, _extends({
    featured: true
  }, d.caseStudies[0], {
    onClick: e => {
      e.preventDefault();
      go("Case studies");
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    },
    className: "c4t-grid-3"
  }, d.caseStudies.slice(1, 4).map(c => /*#__PURE__*/React.createElement(CaseStudyCard, _extends({
    key: c.client
  }, c, {
    onClick: e => {
      e.preventDefault();
      go("Case studies");
    }
  })))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Industries",
    title: "Regulated, or moving fast, or both"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-3"
  }, d.industries.slice(0, 6).map(i => /*#__PURE__*/React.createElement(IndustryCard, _extends({
    key: i.name
  }, i, {
    onClick: e => {
      e.preventDefault();
      go("Industries");
    }
  }))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    },
    className: "c4t-grid-2"
  }, d.testimonials.slice(0, 2).map(t => /*#__PURE__*/React.createElement(Testimonial, _extends({
    key: t.name
  }, t))))), /*#__PURE__*/React.createElement(CtaBanner, {
    eyebrow: "Ready when you are",
    title: "See what your test suite is missing.",
    description: "Bring a build. We'll run a scoped pilot and show you the findings within a week.",
    primaryCta: "Book a demo",
    secondaryCta: "Talk to an engineer",
    note: "No sales sequence.",
    onAction: () => go("Contact")
  }));
}
Object.assign(window, {
  HomePage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/HomePage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/PricingPage.jsx
try { (() => {
const {
  Section,
  SectionHeader,
  PricingTable,
  FaqAccordion,
  CtaBanner,
  Tabs,
  Button,
  Breadcrumb,
  LogoCloud,
  Icon
} = window.Crowd4TestDesignSystem_772017;
function PricingPage({
  go
}) {
  const d = window.C4T;
  const [period, setPeriod] = React.useState("Annual");
  const plans = d.plans.map(p => period === "Monthly" && p.price.startsWith("$9.5") ? {
    ...p,
    price: "$11k"
  } : p);
  const compare = [["AI agent runs", "Scoped", "Unlimited", "Unlimited"], ["Human review of verdicts", "Included", "Included", "Included"], ["Dedicated pod", "—", "Yes", "Yes, multi-product"], ["Accessibility & localization", "Add-on", "Included", "Included"], ["Compliance evidence packs", "—", "Standard", "SOC 2 / ISO / custom"], ["SSO, SCIM, private tenancy", "—", "—", "Included"], ["Response SLA", "Best effort", "Next business day", "Contractual"]];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Pricing"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    align: "center",
    style: {
      marginTop: 24
    },
    eyebrow: "Pricing",
    title: "Priced by programme, not by seat",
    description: "You are buying coverage and judgment, so that is what we charge for. Every plan includes human review."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    items: ["Monthly", "Annual"],
    value: period,
    onChange: setPeriod
  }))), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(PricingTable, {
    plans: plans,
    note: "All prices in USD, excluding tax. Annual commitments save roughly 14%.",
    onSelect: () => go("Contact")
  })), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Compare",
    title: "What is in each plan"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 36,
      overflowX: "auto"
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "var(--type-body-sm-size)"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, ["", "Pilot", "Scale", "Enterprise"].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      textAlign: "left",
      padding: "12px 16px",
      borderBottom: "1px solid var(--border-strong)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--text-primary)"
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, compare.map(row => /*#__PURE__*/React.createElement("tr", {
    key: row[0]
  }, row.map((cell, i) => /*#__PURE__*/React.createElement("td", {
    key: i,
    style: {
      padding: "14px 16px",
      borderBottom: "1px solid var(--border-default)",
      color: i === 0 ? "var(--text-primary)" : "var(--text-secondary)",
      fontWeight: i === 0 ? "var(--fw-medium)" : "var(--fw-regular)"
    }
  }, cell === "Included" || cell === "Yes" ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 16,
    style: {
      color: "var(--teal-500)"
    },
    label: "Included"
  }) : cell)))))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 56,
      alignItems: "start"
    },
    className: "c4t-grid-2"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Objections",
    title: "What procurement usually asks",
    description: "If your question is not here, ask an engineer \u2014 they answer faster than the form does."
  }), /*#__PURE__*/React.createElement(FaqAccordion, {
    items: d.faqs.slice(0, 4)
  }))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    compact: true
  }, /*#__PURE__*/React.createElement(LogoCloud, {
    label: "On these plans today",
    logos: d.logos
  })), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Get a quote against your actual scope.",
    description: "Send us the surfaces and the release cadence. We'll price it in two days.",
    primaryCta: "Book a demo",
    secondaryCta: "Talk to sales",
    onAction: () => go("Contact")
  }));
}
Object.assign(window, {
  PricingPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/PricingPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProductPages.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Hero,
  Section,
  SectionHeader,
  FeatureCard,
  ServiceCard,
  IndustryCard,
  StatBlock,
  Testimonial,
  CtaBanner,
  CapabilitySection,
  Button,
  Badge,
  Icon,
  Media,
  Tabs,
  Breadcrumb,
  LogoCloud
} = window.Crowd4TestDesignSystem_772017;
function PlatformPage({
  go
}) {
  const d = window.C4T;
  const [tab, setTab] = React.useState("Execution");
  const groups = {
    Execution: d.platform.slice(0, 3),
    Evidence: d.platform.slice(3, 6)
  };
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    tone: "inverse",
    eyebrow: "Platform",
    title: "One queue for agents and people",
    description: "Runs are scheduled, executed, reviewed and filed in a single pipeline. You see one report, with a name against every verdict.",
    primaryCta: "Book a demo",
    secondaryCta: "Read the docs",
    onAction: () => go("Contact"),
    media: /*#__PURE__*/React.createElement(Media, {
      ratio: "4 / 3",
      label: "Run queue",
      icon: "list-checks",
      tone: "inverse"
    })
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Capabilities",
    title: "What the platform does"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 32
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    items: ["Execution", "Evidence"],
    value: tab,
    onChange: setTab
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 32
    },
    className: "c4t-grid-3"
  }, groups[tab].map(f => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: f.title
  }, f))))), /*#__PURE__*/React.createElement(CapabilitySection, {
    tone: "sunken",
    eyebrow: "How a run works",
    title: "From merge to triaged finding",
    description: "Four steps, no spreadsheet in the middle.",
    capabilities: d.capabilities
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Integrations",
    title: "It lands where your team already works",
    description: "Findings arrive as tickets with reproduction steps, evidence and an agreed severity."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gap: 16,
      marginTop: 40
    },
    className: "c4t-grid-4"
  }, [["Jira", "kanban"], ["GitHub", "github"], ["Azure DevOps", "git-branch"], ["Slack", "slack"], ["Linear", "square-check"], ["Playwright", "theater"], ["Appium", "smartphone"], ["Datadog", "activity"]].map(([n, i]) => /*#__PURE__*/React.createElement("div", {
    key: n,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: 18,
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: i,
    size: 20,
    style: {
      color: "var(--text-secondary)"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)"
    }
  }, n))))), /*#__PURE__*/React.createElement(Section, {
    tone: "inverse",
    compact: true
  }, /*#__PURE__*/React.createElement(StatBlock, {
    tone: "inverse",
    stats: d.heroStats
  })), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Put a build in front of it.",
    primaryCta: "Book a demo",
    secondaryCta: "Talk to an engineer",
    onAction: () => go("Contact")
  }));
}
function SolutionsPage({
  go
}) {
  const d = window.C4T;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Solutions"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24
    },
    eyebrow: "Solutions",
    title: "Six disciplines, one release gate",
    description: "Pick the ones that matter this quarter. They run in the same pipeline and report in the same place.",
    actions: /*#__PURE__*/React.createElement(Button, {
      onClick: () => go("Contact"),
      iconRight: "arrow-right"
    }, "Book a demo")
  })), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 20
    },
    className: "c4t-grid-2"
  }, d.services.map(s => /*#__PURE__*/React.createElement(ServiceCard, _extends({
    key: s.title
  }, s, {
    onClick: e => {
      e.preventDefault();
      go("AI testing services");
    }
  }))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Coverage",
    title: "What each discipline covers"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-3"
  }, d.solutions.map(s => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: s.title
  }, s))))), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(Testimonial, _extends({
    variant: "feature"
  }, d.testimonials[1], {
    style: {
      maxWidth: 820,
      margin: "0 auto",
      textAlign: "left"
    }
  }))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Not sure which discipline you need?",
    description: "Tell us what is breaking. We'll tell you what to test and what it costs.",
    primaryCta: "Talk to an engineer",
    onAction: () => go("Contact")
  }));
}
function IndustriesPage({
  go
}) {
  const d = window.C4T;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    align: "center",
    media: false,
    eyebrow: "Industries",
    title: "Quality means something different in every sector",
    description: "Regulated industries need evidence. High-velocity ones need speed. We run both models without pretending they are the same.",
    primaryCta: "Book a demo",
    onAction: () => go("Contact")
  }), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    },
    className: "c4t-grid-3"
  }, d.industries.map(i => /*#__PURE__*/React.createElement(IndustryCard, _extends({
    key: i.name
  }, i, {
    onClick: e => {
      e.preventDefault();
      go("Case studies");
    }
  }))))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    compact: true
  }, /*#__PURE__*/React.createElement(LogoCloud, {
    label: "Trusted in regulated and high-velocity sectors",
    logos: d.logos
  })), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Talk to someone who knows your sector.",
    primaryCta: "Book a demo",
    onAction: () => go("Contact")
  }));
}
function AiTestingPage({
  go
}) {
  const d = window.C4T;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Hero, {
    eyebrow: "AI testing services",
    title: "Your model is confident. That is not the same as correct.",
    description: "We grade AI behaviour against a rubric your domain experts write, with a human adjudicating every verdict \u2014 accuracy, grounding, tone, refusal handling and jailbreak resistance.",
    primaryCta: "Book a demo",
    secondaryCta: "See a sample rubric",
    bullets: ["Rubrics written with your experts", "Human adjudication on every verdict", "Drift tracked release over release"],
    onAction: () => go("Contact"),
    media: /*#__PURE__*/React.createElement(Media, {
      ratio: "4 / 3",
      label: "Rubric scoring",
      icon: "scale",
      tone: "accent"
    })
  }), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "What we evaluate",
    title: "The five failure modes we see most"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 44
    },
    className: "c4t-grid-3"
  }, [{
    icon: "cloud-off",
    title: "Ungrounded answers",
    description: "Fluent output with no retrievable source behind it.",
    meta: "Grounding rate"
  }, {
    icon: "message-square-warning",
    title: "Tone collapse",
    description: "Correct information delivered in a register that costs you the customer.",
    meta: "Tone score"
  }, {
    icon: "shield-alert",
    title: "Refusal failure",
    description: "Answering what it should decline, declining what it should answer.",
    meta: "Refusal precision"
  }, {
    icon: "unlock",
    title: "Jailbreak susceptibility",
    description: "Prompt paths that walk around your guardrails.",
    meta: "Red-team pass rate"
  }, {
    icon: "git-compare",
    title: "Behavioural drift",
    description: "A model that quietly changed its mind between releases.",
    meta: "Delta per release"
  }, {
    icon: "workflow",
    title: "Agent loop failure",
    description: "Tool calls that succeed individually and fail as a sequence.",
    meta: "Task completion"
  }].map(f => /*#__PURE__*/React.createElement(FeatureCard, _extends({
    key: f.title
  }, f))))), /*#__PURE__*/React.createElement(CapabilitySection, {
    tone: "inverse",
    reverse: true,
    eyebrow: "Method",
    title: "How adjudication actually works",
    description: "Agents generate, people decide, everything is logged.",
    capabilities: d.capabilities
  }), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 24
    },
    className: "c4t-grid-2"
  }, /*#__PURE__*/React.createElement(Testimonial, d.testimonials[0]), /*#__PURE__*/React.createElement(Testimonial, d.testimonials[1]))), /*#__PURE__*/React.createElement(CtaBanner, {
    tone: "brand",
    title: "Bring us your hardest prompt set.",
    primaryCta: "Book a demo",
    note: "We'll return a scored rubric in ten days.",
    onAction: () => go("Contact")
  }));
}
Object.assign(window, {
  PlatformPage,
  SolutionsPage,
  IndustriesPage,
  AiTestingPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProductPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ProofPages.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Section,
  SectionHeader,
  CaseStudyCard,
  Testimonial,
  StatBlock,
  CtaBanner,
  Button,
  Breadcrumb,
  Tag,
  Pagination,
  Media,
  Icon,
  LogoCloud
} = window.Crowd4TestDesignSystem_772017;
function CaseStudiesPage({
  go
}) {
  const d = window.C4T;
  const filters = ["All", "Financial services", "AI / B2B SaaS", "Retail & e-commerce", "Healthcare"];
  const [filter, setFilter] = React.useState("All");
  const [page, setPage] = React.useState(1);
  const list = filter === "All" ? d.caseStudies : d.caseStudies.filter(c => c.industry === filter);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Case studies"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24
    },
    eyebrow: "Case studies",
    title: "What changed, and by how much",
    description: "Every study reports a baseline, an intervention and a measured result. If we could not measure it, it is not here."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 32
    }
  }, filters.map(f => /*#__PURE__*/React.createElement(Tag, {
    key: f,
    active: filter === f,
    onClick: () => setFilter(f)
  }, f)))), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(CaseStudyCard, _extends({
    featured: true
  }, list[0], {
    onClick: e => {
      e.preventDefault();
      go("Customer stories");
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 20
    },
    className: "c4t-grid-3"
  }, list.slice(1).map(c => /*#__PURE__*/React.createElement(CaseStudyCard, _extends({
    key: c.client
  }, c, {
    onClick: e => {
      e.preventDefault();
      go("Customer stories");
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    pageCount: 4,
    onChange: setPage
  }))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Your numbers could be the next study.",
    primaryCta: "Book a demo",
    onAction: () => go("Contact")
  }));
}
function CustomerStoriesPage({
  go
}) {
  const d = window.C4T;
  const c = d.caseStudies[0];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Case studies", c.client],
    onNavigate: go
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 760,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-brand)"
    }
  }, c.industry), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 16,
      fontSize: "var(--type-display-lg-size)",
      lineHeight: "var(--type-display-lg-line)",
      letterSpacing: "var(--type-display-lg-tracking)",
      textWrap: "balance"
    }
  }, c.headline), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 18,
      fontSize: "var(--type-body-lg-size)",
      color: "var(--text-secondary)"
    }
  }, c.client, " releases to eleven European markets every fortnight. Regression was taking nine days and two contractors, and still missing the payment edge cases that mattered most.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Media, {
    ratio: "21 / 9",
    label: `${c.client} — release dashboard`,
    icon: "building-2"
  }))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken",
    compact: true
  }, /*#__PURE__*/React.createElement(StatBlock, {
    stats: c.results.map(r => ({
      value: r.value,
      label: r.label
    }))
  })), /*#__PURE__*/React.createElement(Section, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1.4fr 1fr",
      gap: 56,
      alignItems: "start"
    },
    className: "c4t-grid-2"
  }, /*#__PURE__*/React.createElement("article", {
    style: {
      maxWidth: 680,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, [["The problem", "Nine days of regression per release, run by two rotating contractors, with no shared definition of what \u201Ccovered\u201D meant. Payment edge cases were found in production more often than in test."], ["What we did", "A dedicated pod mapped the twelve highest-risk journeys, handed the volume to agents and kept human reviewers on the payment and authentication paths. Everything filed straight into the existing Jira project."], ["The result", "Regression now runs in fourteen hours against every merge candidate. Coverage per sprint went up 4.2\u00D7 and the first finding of a run lands, on average, eleven minutes in."]].map(([h, p]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: "var(--type-heading-md-size)",
      letterSpacing: "var(--type-heading-md-tracking)"
    }
  }, h), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 10,
      fontSize: "var(--type-body-md-size)",
      lineHeight: 1.7,
      color: "var(--text-secondary)"
    }
  }, p)))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 96,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      border: "1px solid var(--border-default)",
      borderRadius: "var(--radius-card)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Engagement"), /*#__PURE__*/React.createElement("dl", {
    style: {
      margin: "14px 0 0",
      display: "grid",
      gap: 12
    }
  }, [["Model", "Managed QE pod"], ["Duration", "18 months, ongoing"], ["Surfaces", "Web, iOS, Android"], ["Disciplines", "Regression, performance, accessibility"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
    key: k
  }, /*#__PURE__*/React.createElement("dt", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)"
    }
  }, k), /*#__PURE__*/React.createElement("dd", {
    style: {
      margin: 0,
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)"
    }
  }, v))))), /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    iconRight: "arrow-right",
    onClick: () => go("Contact")
  }, "Book a similar pilot")))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "In their words",
    title: "More customer stories"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 40
    },
    className: "c4t-grid-3"
  }, d.testimonials.map(t => /*#__PURE__*/React.createElement(Testimonial, _extends({
    key: t.name
  }, t))))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Ask us for the reference call.",
    description: "We'll put you on a call with a customer in your sector, not a slide about one.",
    primaryCta: "Book a demo",
    onAction: () => go("Contact")
  }));
}
Object.assign(window, {
  CaseStudiesPage,
  CustomerStoriesPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ProofPages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/ResourcePages.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const {
  Section,
  SectionHeader,
  ResourceCard,
  FaqAccordion,
  CtaBanner,
  Button,
  Breadcrumb,
  Tag,
  Pagination,
  Input,
  Media,
  Icon,
  Badge,
  Testimonial
} = window.Crowd4TestDesignSystem_772017;
function ResourcesPage({
  go
}) {
  const d = window.C4T;
  const [filter, setFilter] = React.useState("All");
  const types = ["All", "Report", "Guide", "Article", "Webinar", "Case study"];
  const list = filter === "All" ? d.posts : d.posts.filter(p => p.type === filter);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Resources"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24
    },
    eyebrow: "Resources & insights",
    title: "Field notes from the quality frontline",
    description: "Research, playbooks and post-mortems. No gates, no forms, no drip sequence."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 32,
      alignItems: "center"
    }
  }, types.map(t => /*#__PURE__*/React.createElement(Tag, {
    key: t,
    active: filter === t,
    onClick: () => setFilter(t)
  }, t)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      minWidth: 260
    }
  }, /*#__PURE__*/React.createElement(Input, {
    iconLeft: "search",
    placeholder: "Search resources",
    "aria-label": "Search resources"
  })))), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement(ResourceCard, _extends({
    layout: "horizontal"
  }, list[0], {
    onClick: e => {
      e.preventDefault();
      go("Blog post");
    },
    style: {
      marginBottom: 20
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    },
    className: "c4t-grid-3"
  }, list.slice(1).map(p => /*#__PURE__*/React.createElement(ResourceCard, _extends({
    key: p.title
  }, p, {
    onClick: e => {
      e.preventDefault();
      go("Blog post");
    }
  }))))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Get the quarterly QE benchmark.",
    description: "One email a quarter with the numbers behind the trends. Unsubscribe in one click.",
    primaryCta: "Subscribe",
    onAction: () => go("Thank you")
  }));
}
function BlogPage({
  go
}) {
  const d = window.C4T;
  const [page, setPage] = React.useState(1);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Blog"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24
    },
    eyebrow: "Blog",
    title: "Writing about testing things that think"
  })), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: 20
    },
    className: "c4t-grid-2"
  }, d.posts.map(p => /*#__PURE__*/React.createElement(ResourceCard, _extends({
    key: p.title,
    layout: "horizontal"
  }, p, {
    onClick: e => {
      e.preventDefault();
      go("Blog post");
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      marginTop: 48
    }
  }, /*#__PURE__*/React.createElement(Pagination, {
    page: page,
    pageCount: 9,
    onChange: setPage
  }))));
}
function BlogPostPage({
  go
}) {
  const d = window.C4T;
  const post = d.posts[1];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "Blog", post.type],
    onNavigate: go
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-prose)",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "brand"
  }, post.type), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)"
    }
  }, post.date, " \xB7 ", post.readTime)), /*#__PURE__*/React.createElement("h1", {
    style: {
      marginTop: 18,
      fontSize: "var(--type-display-lg-size)",
      lineHeight: "var(--type-display-lg-line)",
      letterSpacing: "var(--type-display-lg-tracking)",
      textWrap: "balance"
    }
  }, post.title), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24,
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: "var(--surface-muted)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 600,
      fontSize: 14
    }
  }, "PR"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-body-sm-size)",
      fontWeight: "var(--fw-medium)"
    }
  }, post.author), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      fontSize: "var(--type-caption-size)",
      color: "var(--text-muted)"
    }
  }, "Principal Quality Engineer")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(Media, {
    ratio: "21 / 9",
    label: "Article header",
    icon: "image"
  }))), /*#__PURE__*/React.createElement(Section, {
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: "var(--container-prose)",
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      lineHeight: 1.6,
      color: "var(--text-primary)"
    }
  }, "Most teams evaluate an agent by asking it to evaluate itself. It scores well. It always scores well. Here is a rubric you can run this sprint instead."), ["Start with the decisions, not the outputs. An agent that returns a fluent paragraph and an agent that books the wrong flight fail differently, and only one of them shows up in a text-similarity score.", "Write the rubric with the people who will be blamed when it goes wrong. Support leads know what an unacceptable answer sounds like; your eval harness does not.", "Score every dimension separately: grounding, tone, refusal handling, task completion. A single aggregate number hides exactly the regression you needed to catch."].map((p, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    style: {
      fontSize: "var(--type-body-lg-size)",
      lineHeight: 1.75,
      color: "var(--text-secondary)"
    }
  }, p)), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: "12px 0",
      paddingLeft: 24,
      borderLeft: "2px solid var(--coral-500)",
      fontSize: 22,
      lineHeight: 1.5,
      letterSpacing: "-0.2px",
      color: "var(--text-primary)"
    }
  }, "If a human never disagreed with your evaluator, your evaluator is not evaluating."), /*#__PURE__*/React.createElement("h2", {
    style: {
      marginTop: 12,
      fontSize: "var(--type-heading-lg-size)",
      letterSpacing: "var(--type-heading-lg-tracking)"
    }
  }, "Running the first pass"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "var(--type-body-lg-size)",
      lineHeight: 1.75,
      color: "var(--text-secondary)"
    }
  }, "Sample two hundred interactions, score them blind with two reviewers, and measure the disagreement rate before you measure the model. If your reviewers disagree more than fifteen percent of the time, the rubric is the problem."))), /*#__PURE__*/React.createElement(Section, {
    tone: "sunken"
  }, /*#__PURE__*/React.createElement(SectionHeader, {
    eyebrow: "Keep reading",
    title: "Related"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20,
      marginTop: 40
    },
    className: "c4t-grid-3"
  }, d.posts.slice(2, 5).map(p => /*#__PURE__*/React.createElement(ResourceCard, _extends({
    key: p.title
  }, p, {
    onClick: e => e.preventDefault()
  }))))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Want this run against your product?",
    primaryCta: "Book a demo",
    onAction: () => go("Contact")
  }));
}
function FaqPage({
  go
}) {
  const d = window.C4T;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Section, {
    compact: true
  }, /*#__PURE__*/React.createElement(Breadcrumb, {
    items: ["Home", "FAQs"],
    onNavigate: go
  }), /*#__PURE__*/React.createElement(SectionHeader, {
    style: {
      marginTop: 24
    },
    eyebrow: "FAQs",
    title: "How engagements actually work",
    description: "The questions procurement asks, answered before you have to ask them."
  })), /*#__PURE__*/React.createElement(Section, {
    compact: true,
    style: {
      paddingTop: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: 56,
      alignItems: "start"
    },
    className: "c4t-grid-2"
  }, /*#__PURE__*/React.createElement(FaqAccordion, {
    items: d.faqs
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 24,
      background: "var(--surface-sunken)",
      border: "1px solid var(--border-subtle)",
      borderRadius: "var(--radius-card)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-circle",
    size: 22,
    style: {
      color: "var(--coral-500)"
    }
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      marginTop: 12,
      fontSize: "var(--type-heading-sm-size)"
    }
  }, "Still deciding?"), /*#__PURE__*/React.createElement("p", {
    style: {
      marginTop: 8,
      fontSize: "var(--type-body-sm-size)",
      color: "var(--text-secondary)"
    }
  }, "Ask a quality engineer directly. No qualification call first."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement(Button, {
    fullWidth: true,
    variant: "secondary",
    onClick: () => go("Contact")
  }, "Ask a question"))))), /*#__PURE__*/React.createElement(CtaBanner, {
    title: "Everything else, in one call.",
    primaryCta: "Book a demo",
    onAction: () => go("Contact")
  }));
}
Object.assign(window, {
  ResourcesPage,
  BlogPage,
  BlogPostPage,
  FaqPage
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/ResourcePages.jsx", error: String((e && e.message) || e) }); }

// ui_kits/website/content.js
try { (() => {
// Shared copy for the Crowd4Test marketing site kit. Fictional but on-brand.
const C4T = {
  logos: ["Nordbank", "Helvia", "Kirin Retail", "Volt Mobility", "Perenna Health", "Atlas Freight"],
  heroStats: [{
    value: "42,000",
    label: "Vetted testers",
    detail: "96 countries, 38 languages"
  }, {
    value: "11 min",
    label: "Median first finding",
    detail: "From run start"
  }, {
    value: "−63%",
    label: "Escaped defects",
    detail: "Average, first year"
  }, {
    value: "98.4%",
    label: "AI verdicts human-reviewed"
  }],
  platform: [{
    icon: "bot",
    title: "AI test agents",
    description: "Agents explore your build the way a curious user would — every path, every release, overnight.",
    meta: "9,412 runs / week"
  }, {
    icon: "users",
    title: "Crowd test network",
    description: "Vetted testers on real devices, in real markets, under NDA and background check.",
    meta: "42,000 testers"
  }, {
    icon: "clipboard-check",
    title: "Human review layer",
    description: "Every agent verdict is graded by a person before it reaches your backlog.",
    meta: "98.4% reviewed"
  }, {
    icon: "line-chart",
    title: "Coverage analytics",
    description: "See which flows are covered, which are guessed at, and which nobody has touched since April.",
    meta: "Per-release deltas"
  }, {
    icon: "workflow",
    title: "Test orchestration",
    description: "One queue for agents and humans, one report, one definition of done.",
    meta: "Jira · GitHub · ADO"
  }, {
    icon: "shield-check",
    title: "Evidence trail",
    description: "Signed, timestamped and exportable — the artefact auditors actually accept.",
    meta: "SOC 2 · ISO 27001"
  }],
  capabilities: [{
    icon: "sparkles",
    title: "Autonomous exploration",
    description: "Agents map your application, generate candidate journeys and run them against every build — no scripts to maintain."
  }, {
    icon: "scale",
    title: "Grounded evaluation",
    description: "For AI products we grade output against a rubric your domain experts wrote: accuracy, tone, refusal handling, hallucination rate."
  }, {
    icon: "user-check",
    title: "Human adjudication",
    description: "Reviewers confirm, reject or escalate each finding. You get a triaged list, not a firehose."
  }, {
    icon: "repeat",
    title: "Continuous regression",
    description: "Suites re-run on every merge; drift is reported as a delta, not a fresh 400-row spreadsheet."
  }],
  services: [{
    icon: "users-round",
    eyebrow: "Engagement",
    title: "Managed QE pods",
    description: "A dedicated, sprint-embedded team with a named quality lead.",
    points: ["Named QE lead", "Sprint-embedded", "Evidence filed in your Jira"],
    badge: "Most chosen"
  }, {
    icon: "flask-conical",
    eyebrow: "Engagement",
    title: "AI testing services",
    description: "Model, agent and RAG evaluation graded against a human rubric.",
    points: ["Hallucination and grounding checks", "Red-teaming and jailbreak resistance", "Tone and refusal review"]
  }, {
    icon: "code",
    eyebrow: "Build",
    title: "Test automation",
    description: "Playwright, Appium and Cypress suites your team can own on day one.",
    points: ["Your repo, your licence", "CI-wired from the first commit", "Handover workshop included"]
  }, {
    icon: "compass",
    eyebrow: "Advisory",
    title: "QE advisory",
    description: "A maturity assessment and a roadmap you can put in front of a board.",
    points: ["Six-week assessment", "Benchmarked against your sector", "Costed remediation plan"]
  }],
  industries: [{
    icon: "landmark",
    name: "Financial services",
    description: "Audit-ready evidence on every release, without slowing the release.",
    stat: "−63%",
    statLabel: "Production defects, year one"
  }, {
    icon: "heart-pulse",
    name: "Healthcare & life sciences",
    description: "HIPAA-safe test data handling and clinician-reviewed journeys.",
    stat: "100%",
    statLabel: "PHI-free test datasets"
  }, {
    icon: "shopping-cart",
    name: "Retail & e-commerce",
    description: "Peak-season readiness across the device matrix your customers actually carry.",
    stat: "3.1×",
    statLabel: "Peak-week checkout coverage"
  }, {
    icon: "radio-tower",
    name: "Telecom & media",
    description: "Device, network and carrier permutations tested in-market.",
    stat: "740+",
    statLabel: "Device / OS combinations"
  }, {
    icon: "cloud",
    name: "B2B SaaS",
    description: "Continuous regression for teams shipping every week.",
    stat: "14 hrs",
    statLabel: "Full regression cycle"
  }, {
    icon: "building-2",
    name: "Public sector",
    description: "Section 508 and WCAG 2.2 conformance, evidenced.",
    stat: "AA+",
    statLabel: "Conformance achieved"
  }],
  solutions: [{
    icon: "test-tube-diagonal",
    title: "Functional & regression",
    description: "Release-gating suites that run on every build and report as a delta.",
    meta: "Web · iOS · Android"
  }, {
    icon: "sparkles",
    title: "AI product evaluation",
    description: "Grounding, tone, refusal handling and jailbreak resistance, graded by people.",
    meta: "LLM · agent · RAG"
  }, {
    icon: "accessibility",
    title: "Accessibility (WCAG 2.2)",
    description: "Audits run with assistive-technology users, not just automated scanners.",
    meta: "AA and AAA"
  }, {
    icon: "gauge",
    title: "Performance & load",
    description: "Find the ceiling before your customers do, with a plan for raising it.",
    meta: "k6 · JMeter"
  }, {
    icon: "globe",
    title: "Localization",
    description: "In-market testers check meaning, formatting and cultural fit.",
    meta: "38 languages"
  }, {
    icon: "shield-check",
    title: "Security assurance",
    description: "OWASP-aligned validation folded into the same release gate.",
    meta: "OWASP ASVS"
  }],
  caseStudies: [{
    client: "Nordbank",
    industry: "Financial services",
    headline: "Cutting release regression from nine days to fourteen hours",
    results: [{
      value: "−94%",
      label: "Regression cycle time"
    }, {
      value: "4.2×",
      label: "Coverage per sprint"
    }, {
      value: "11 min",
      label: "Median first finding"
    }]
  }, {
    client: "Helvia",
    industry: "AI / B2B SaaS",
    headline: "Grading a support agent against a rubric its own model wrote",
    results: [{
      value: "−71%",
      label: "Escaped defects"
    }, {
      value: "2 quarters",
      label: "To full coverage"
    }]
  }, {
    client: "Kirin Retail",
    industry: "Retail & e-commerce",
    headline: "A peak season with no checkout incidents, for the first time in six years",
    results: [{
      value: "0",
      label: "P1 incidents in peak"
    }, {
      value: "3.1×",
      label: "Checkout coverage"
    }]
  }, {
    client: "Volt Mobility",
    industry: "Telecom & media",
    headline: "740 device permutations tested in-market before an EU launch",
    results: [{
      value: "740+",
      label: "Device combinations"
    }, {
      value: "9 days",
      label: "Launch readiness"
    }]
  }, {
    client: "Perenna Health",
    industry: "Healthcare",
    headline: "Clinician-reviewed test journeys for a triage assistant",
    results: [{
      value: "100%",
      label: "PHI-free datasets"
    }, {
      value: "−48%",
      label: "Clinical review rework"
    }]
  }, {
    client: "Atlas Freight",
    industry: "Logistics",
    headline: "Regression that keeps up with four deploys a day",
    results: [{
      value: "4/day",
      label: "Deploys covered"
    }, {
      value: "−58%",
      label: "Rollbacks"
    }]
  }],
  testimonials: [{
    quote: "The agents find the volume. The human reviewers tell us which twelve findings actually matter before Monday's release.",
    name: "Dana Okafor",
    role: "VP Engineering",
    company: "Helvia",
    metric: "−71%",
    metricLabel: "Escaped defects, two quarters"
  }, {
    quote: "We stopped arguing about whether the model was good enough and started reading a rubric score. That changed the conversation with our board.",
    name: "Marcus Lindqvist",
    role: "Chief Product Officer",
    company: "Nordbank"
  }, {
    quote: "Our peak week used to be a war room. This year it was a dashboard and a quiet Slack channel.",
    name: "Aiko Tanaka",
    role: "Director of QA",
    company: "Kirin Retail"
  }],
  plans: [{
    name: "Pilot",
    description: "One scoped programme, run end to end, so you can see the evidence before you commit.",
    price: "$14k",
    period: "/ engagement",
    cta: "Scope a pilot",
    featuresLabel: "Includes",
    features: ["One product surface", "AI agent run + human review", "Coverage and risk report", "Four-week engagement"]
  }, {
    name: "Scale",
    description: "A dedicated pod embedded in your sprints, with continuous regression and evidence.",
    price: "$9.5k",
    period: "/ month",
    cta: "Book a demo",
    badge: "Most chosen",
    highlighted: true,
    featuresLabel: "Everything in Pilot, plus",
    features: ["Dedicated QE pod and named lead", "Continuous regression on every merge", "Jira / GitHub / ADO integration", "Quarterly maturity review", "Accessibility and localization coverage"]
  }, {
    name: "Enterprise",
    description: "Multi-product programmes with compliance evidence, SSO and a contractual SLA.",
    price: "Custom",
    period: "",
    cta: "Talk to sales",
    featuresLabel: "Everything in Scale, plus",
    features: ["Multi-product coverage", "SOC 2 / ISO evidence packs", "SSO, SCIM and private tenancy", "Named delivery director", "Contractual response SLA"]
  }],
  faqs: [{
    q: "How fast can a pod start?",
    a: "Ten business days from signature — five if we can already reach a staging environment. The first week is scoping and access; findings usually start landing in week two."
  }, {
    q: "Do you actually test AI products, or just test with AI?",
    a: "Both, and they are different services. Agent-run testing is how we cover your product quickly. AI product evaluation is a separate discipline: grading model and agent behaviour against a rubric your domain experts write, with human adjudication on every verdict."
  }, {
    q: "Who owns the test assets you build?",
    a: "You do. Automation ships in your repository under your licence, and the handover workshop is part of the engagement, not an upsell."
  }, {
    q: "How do you handle our data?",
    a: "Test data is synthetic or masked by default. We are SOC 2 Type II and ISO 27001 certified, GDPR-compliant, and every tester works under NDA with a completed background check."
  }, {
    q: "What does the crowd network actually give us that automation does not?",
    a: "Context. Real devices on real networks in the market you are launching in, and a person who can tell you that a flow is technically correct and still confusing."
  }, {
    q: "Can you work inside our existing tooling?",
    a: "Yes. Findings land in Jira, GitHub Issues or Azure DevOps with reproduction steps, evidence and a severity your team agreed to — not a separate portal nobody logs into."
  }],
  posts: [{
    type: "Report",
    title: "State of AI Quality 2026: what 1,200 engineering leaders told us",
    description: "Where teams are shipping AI features without an evaluation layer, and what it is costing them.",
    author: "Crowd4Test Research",
    date: "Jul 2026",
    readTime: "18 min read"
  }, {
    type: "Guide",
    title: "How to evaluate an LLM agent before it ships",
    description: "A rubric your QA team can run this sprint, with worked examples for support and search.",
    author: "Priya Raman",
    date: "Jun 2026",
    readTime: "9 min read"
  }, {
    type: "Article",
    title: "Your regression suite is a museum",
    description: "Most suites test the product you shipped three years ago. Here is how to tell.",
    author: "Tom Fielding",
    date: "Jun 2026",
    readTime: "6 min read"
  }, {
    type: "Webinar",
    title: "Accessibility testing with assistive-technology users",
    description: "What scanners miss, and how to run sessions that produce fixable findings.",
    author: "Nadia Haddad",
    date: "May 2026",
    readTime: "42 min"
  }, {
    type: "Case study",
    title: "Inside Nordbank's fourteen-hour regression cycle",
    description: "The architecture, the pod structure and the two things that nearly broke it.",
    author: "Crowd4Test",
    date: "May 2026",
    readTime: "11 min read"
  }, {
    type: "Article",
    title: "Why we grade AI verdicts by hand",
    description: "The uncomfortable maths behind self-graded model output.",
    author: "Dr. Elena Vasquez",
    date: "Apr 2026",
    readTime: "7 min read"
  }],
  roles: [{
    title: "Senior Quality Engineer",
    team: "Delivery",
    location: "London / Remote UK",
    type: "Full-time"
  }, {
    title: "ML Evaluation Engineer",
    team: "AI Testing",
    location: "Remote EU",
    type: "Full-time"
  }, {
    title: "Community Operations Lead",
    team: "Crowd Network",
    location: "Lisbon",
    type: "Full-time"
  }, {
    title: "Accessibility Specialist",
    team: "Delivery",
    location: "Remote UK",
    type: "Full-time"
  }, {
    title: "Enterprise Account Director",
    team: "Revenue",
    location: "New York",
    type: "Full-time"
  }, {
    title: "Product Designer",
    team: "Platform",
    location: "London / Hybrid",
    type: "Full-time"
  }],
  values: [{
    icon: "eye",
    title: "Evidence over assertion",
    description: "If we cannot show you the run, the reviewer and the timestamp, we do not claim it."
  }, {
    icon: "users",
    title: "People are the control",
    description: "Automation scales the work. Humans decide what the work meant."
  }, {
    icon: "message-square",
    title: "Plain reporting",
    description: "Severity in words your product manager understands, not a colour-coded matrix."
  }, {
    icon: "handshake",
    title: "Handover by default",
    description: "Every asset we build is yours, documented, from day one."
  }]
};
window.C4T = C4T;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/website/content.js", error: String((e && e.message) || e) }); }

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.CapabilitySection = __ds_scope.CapabilitySection;

__ds_ns.CaseStudyCard = __ds_scope.CaseStudyCard;

__ds_ns.ContactForm = __ds_scope.ContactForm;

__ds_ns.CtaBanner = __ds_scope.CtaBanner;

__ds_ns.FaqAccordion = __ds_scope.FaqAccordion;

__ds_ns.FeatureCard = __ds_scope.FeatureCard;

__ds_ns.Hero = __ds_scope.Hero;

__ds_ns.IndustryCard = __ds_scope.IndustryCard;

__ds_ns.LogoCloud = __ds_scope.LogoCloud;

__ds_ns.Media = __ds_scope.Media;

__ds_ns.PricingTable = __ds_scope.PricingTable;

__ds_ns.ResourceCard = __ds_scope.ResourceCard;

__ds_ns.Section = __ds_scope.Section;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.ServiceCard = __ds_scope.ServiceCard;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.DEFAULT_FOOTER_COLUMNS = __ds_scope.DEFAULT_FOOTER_COLUMNS;

__ds_ns.Footer = __ds_scope.Footer;

__ds_ns.Pagination = __ds_scope.Pagination;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.DEFAULT_NAV = __ds_scope.DEFAULT_NAV;

__ds_ns.TopNav = __ds_scope.TopNav;

})();
