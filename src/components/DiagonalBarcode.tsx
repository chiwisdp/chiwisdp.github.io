import { useState, useEffect, useRef } from "react";

// TypeScript interface for component props
interface DiagonalBarcodeProps {
  maxWidth?: number;
  maxHeight?: number;
  aspectRatio?: number | null;
  barCount?: number;
  angle?: number;
  colors?: string[];
  className?: string;
  responsive?: boolean;
  minBarCount?: number;
  maxBarCount?: number;
  fullHeight?: boolean;
}

// TypeScript interface for individual bars
interface BarDetails {
  position: number;
  color: string;
  width: number;
}

// Default properties for the barcode
const DEFAULT_PROPS = {
  maxWidth: 300,
  maxHeight: 200,
  aspectRatio: 1.5, // width:height ratio (null means use container's height)
  barCount: 20,
  angle: 45,
  colors: ["#000000", "#FFFFFF"],
  className: "",
  responsive: true,
  minBarCount: 10, // Minimum number of bars for smaller screens
  maxBarCount: 40, // Maximum number of bars for larger screens
  fullHeight: false, // Whether to take full height of container
};

export const DiagonalBarcode: React.FC<DiagonalBarcodeProps> = ({
  maxWidth = DEFAULT_PROPS.maxWidth,
  maxHeight = DEFAULT_PROPS.maxHeight,
  aspectRatio = DEFAULT_PROPS.aspectRatio,
  barCount = DEFAULT_PROPS.barCount,
  angle = DEFAULT_PROPS.angle,
  colors = DEFAULT_PROPS.colors,
  className = DEFAULT_PROPS.className,
  responsive = DEFAULT_PROPS.responsive,
  minBarCount = DEFAULT_PROPS.minBarCount,
  maxBarCount = DEFAULT_PROPS.maxBarCount,
  fullHeight = DEFAULT_PROPS.fullHeight,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bars, setBars] = useState<BarDetails[]>([]);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [dynamicBarCount, setDynamicBarCount] = useState(barCount);

  // Handle resize and initial dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const parentElement = containerRef.current.parentElement;
      if (!parentElement) return;

      const parentWidth = parentElement.clientWidth;
      const parentHeight = parentElement.clientHeight;

      let width: number;
      let height: number;

      // Calculate responsive width (limited by maxWidth)
      width = Math.min(parentWidth, maxWidth);

      // Calculate height based on different scenarios
      if (fullHeight) {
        // Use full height of parent
        height = parentHeight;
      } else if (aspectRatio === null) {
        // Use available parent height (limited by maxHeight)
        height = Math.min(parentHeight, maxHeight);
      } else {
        // Calculate height based on aspect ratio
        height = Math.min(width / aspectRatio, maxHeight);
      }

      setContainerDimensions({ width, height });

      // Calculate responsive bar count if enabled
      if (responsive) {
        // Calculate based on the larger dimension
        const dimensionRatio = Math.max(width / maxWidth, height / maxHeight);

        // Linear scale between minBarCount and maxBarCount based on dimensions
        const scaledBarCount = Math.floor(
          minBarCount +
            (maxBarCount - minBarCount) * Math.min(1, dimensionRatio)
        );
        setDynamicBarCount(scaledBarCount);
      }
    };

    // Create a ResizeObserver for more accurate size detection
    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    // Observe both window and container's parent
    if (containerRef.current && containerRef.current.parentElement) {
      resizeObserver.observe(containerRef.current.parentElement);
    }

    // Initial update
    updateDimensions();

    // Add window resize listener as backup
    window.addEventListener("resize", updateDimensions);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateDimensions);
    };
  }, [
    maxWidth,
    maxHeight,
    aspectRatio,
    responsive,
    minBarCount,
    maxBarCount,
    fullHeight,
  ]);

  // Generate bars whenever dimensions or bar count changes
  useEffect(() => {
    const { width, height } = containerDimensions;
    if (width === 0 || height === 0) return;

    // Calculate the width of each bar based on current dimensions
    const barWidth = (width * 1.5) / dynamicBarCount;

    const newBars: BarDetails[] = [];

    // Calculate diagonal length to ensure full coverage
    const diagonalLength = Math.sqrt(width * width + height * height);
    const totalWidth = diagonalLength + barWidth * 2;
    const startOffset = -diagonalLength / 2;

    for (let i = 0; i < dynamicBarCount; i++) {
      const position = startOffset + (totalWidth / dynamicBarCount) * i;
      const colorIndex = Math.floor(Math.random() * colors.length);

      newBars.push({
        position,
        color: colors[colorIndex],
        width: barWidth,
      });
    }

    setBars(newBars);
  }, [containerDimensions, dynamicBarCount, colors]);

  // Style based on whether we're using aspect ratio or dynamic height
  const containerStyle: React.CSSProperties = {
    maxWidth: `${maxWidth}px`,
    maxHeight: `${maxHeight}px`,
    width: "100%",
  };

  // Only add aspect ratio if it's not null and we're not using fullHeight
  if (aspectRatio !== null && !fullHeight) {
    containerStyle.aspectRatio = `${aspectRatio}/1`;
  }

  // If using fullHeight, set height to 100%
  if (fullHeight) {
    containerStyle.height = "100%";
  }

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={containerStyle}
    >
      {bars.map((bar, index) => (
        <div
          key={index}
          className="absolute"
          style={{
            backgroundColor: bar.color,
            width: `${bar.width}px`,
            height: "200%",
            left: "50%",
            top: "-50%",
            transform: `translateX(${bar.position}px) rotate(${angle}deg)`,
          }}
        />
      ))}
    </div>
  );
};
