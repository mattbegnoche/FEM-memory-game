import React from "react";
import Link from "next/link";
import clsx from "clsx";
import style from "./Button.module.css";

type ButtonVariant = "primary" | "secondary" | "selection" | "big";

interface ButtonBaseProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

/** Native attributes for `T`, minus anything ButtonBaseProps already owns. */
type NativeProps<T extends React.ElementType> = Omit<
  React.ComponentPropsWithRef<T>,
  keyof ButtonBaseProps | "as"
>;

/* JSX excess-property checking is relaxed across a union: any prop belonging to
   any member is accepted on every member. `href?: never` closes that hole on the
   branches that can't navigate. */
type ButtonAsButton = ButtonBaseProps & {
  as?: "button";
  href?: never;
} & NativeProps<"button">;

type ButtonAsAnchor = ButtonBaseProps & { as: "a"; href: string } & Omit<
    NativeProps<"a">,
    "href"
  >;

type ButtonAsRadio = ButtonBaseProps & {
  as: "radio";
  name: string;
  value: string;
  href?: never;
} & Omit<NativeProps<"input">, "type" | "name" | "value">;

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsRadio;

const EXTERNAL_HREF_PATTERN = /^(https?:|mailto:|tel:)/;

function isExternalHref(href: string): boolean {
  return EXTERNAL_HREF_PATTERN.test(href);
}

function Button(props: ButtonProps) {
  // Narrow before destructuring: pulling `as` out first discards the
  // discriminant and collapses the union back to its intersection.
  if (props.as === "radio") {
    const {
      as: _as,
      variant = "selection",
      className,
      children,
      ...inputProps
    } = props;

    return (
      <label className={clsx(style.button, style[variant], className)}>
        <input {...inputProps} type="radio" className={style.radioInput} />
        {children}
      </label>
    );
  }

  if (props.as === "a") {
    const {
      as: _as,
      variant = "primary",
      className,
      children,
      href,
      target,
      rel,
      ...anchorProps
    } = props;
    const anchorClassName = clsx(style.button, style[variant], className);

    if (isExternalHref(href) || target) {
      return (
        <a
          {...anchorProps}
          className={anchorClassName}
          href={href}
          target={target}
          rel={target === "_blank" ? (rel ?? "noreferrer") : rel}
        >
          {children}
        </a>
      );
    }

    return (
      <Link {...anchorProps} className={anchorClassName} href={href}>
        {children}
      </Link>
    );
  }

  const {
    as: _as,
    variant = "primary",
    className,
    children,
    type = "button",
    ...buttonProps
  } = props;

  return (
    <button
      {...buttonProps}
      type={type}
      className={clsx(style.button, style[variant], className)}
    >
      {children}
    </button>
  );
}

export default Button;
export type { ButtonProps, ButtonVariant };
