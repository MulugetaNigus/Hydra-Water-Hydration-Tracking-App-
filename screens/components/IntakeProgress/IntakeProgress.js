import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";
import { useSelector } from "react-redux";

// Dummy notification function - replace with your actual notification logic
const showNotification = (message) => {
  alert(message); // Simple alert for demonstration; replace with your notification component
};

const IntakeProgress = () => {
  const IntakeWater = useSelector((state) => state.counter.value);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const targetIntake = IntakeWater;
    const initialProgress = Math.min((IntakeWater / targetIntake) * 100, 100);
    setProgress(initialProgress);

    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(interval); // Stop the interval if progress is 0 or less
          showNotification("Congratulations! I did it!"); // Call the notification on achievement
          return 0; // Ensure progress does not go negative
        }
        return Math.max(prevProgress - 5, 0); // Decrease progress by 5%, but not below 0%
      });
    }, 3000); // 30 minutes in milliseconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [IntakeWater]);

  const radius = 100;
  const strokeWidth = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <View style={styles.intakeprogress}>
          <Text style={styles.progressText}>
            <FontAwesome6 name="bars-progress" size={24} color="#3498db" />{" "}
            Intake Progress
          </Text>

          <Text style={styles.targetText}>
            <Feather name="target" size={24} color="#3498db" />
            Target: {isNaN(progress) ? "0" : progress} % 
          </Text>
        </View>

        <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
          <Circle
            stroke="white"
            fill="transparent"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            stroke="lightblue"
            fill="transparent"
            cx={radius + strokeWidth / 2}
            cy={radius + strokeWidth / 2}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            originX={radius + strokeWidth / 2}
            originY={radius + strokeWidth / 2}
          />
        </Svg>

        <View style={styles.textContainer}>
          <Text style={styles.label}>{`${
            isNaN(Math.round(progress)) ? 0 : Math.round(progress)
          }%`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  label: {
    fontSize: 40,
    marginTop: 55,
    color: "#3498db",
    fontWeight: "900",
  },
  intakeprogress: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "bold",
  },
  targetText: {
    fontSize: 16,
    color: "#3498db",
    fontWeight: "bold",
  },
});

export default IntakeProgress;
