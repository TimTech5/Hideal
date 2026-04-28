import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RadioButton
} from 'react-native';

const SurveyScreen = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState({});

  const surveyQuestions = [
    {
      id: 1,
      text: 'What is your favorite drink brand?',
      type: 'MULTIPLE_CHOICE',
      options: ['Brand A', 'Brand B', 'Brand C', 'Other']
    },
    {
      id: 2,
      text: 'How often do you visit bars?',
      type: 'MULTIPLE_CHOICE',
      options: ['Weekly', 'Bi-weekly', 'Monthly', 'Rarely']
    },
    {
      id: 3,
      text: 'Rate your satisfaction (1-5)',
      type: 'RATING',
      options: ['1', '2', '3', '4', '5']
    }
  ];

  const question = surveyQuestions[currentQuestion];
  const isLastQuestion = currentQuestion === surveyQuestions.length - 1;

  const handleAnswer = (answer) => {
    setResponses({
      ...responses,
      [question.id]: answer
    });
  };

  const handleNext = () => {
    if (!isLastQuestion) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey responses:', responses);
    // Submit survey to API
    alert('Survey submitted successfully!');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Survey</Text>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={[
          styles.progressBar,
          { width: `${((currentQuestion + 1) / surveyQuestions.length) * 100}%` }
        ]} />
      </View>
      <Text style={styles.progressText}>
        Question {currentQuestion + 1} of {surveyQuestions.length}
      </Text>

      {/* Question */}
      <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question.text}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                responses[question.id] === option && styles.optionButtonSelected
              ]}
              onPress={() => handleAnswer(option)}
            >
              <Text style={[
                styles.optionText,
                responses[question.id] === option && styles.optionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, currentQuestion === 0 && styles.buttonDisabled]}
          onPress={handlePrevious}
          disabled={currentQuestion === 0}
        >
          <Text style={styles.buttonText}>← Previous</Text>
        </TouchableOpacity>

        {isLastQuestion ? (
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit Survey</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleNext}
          >
            <Text style={styles.buttonText}>Next →</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f9fafb'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    marginBottom: 10,
    overflow: 'hidden'
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#0088FE'
  },
  progressText: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 20
  },
  questionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    marginBottom: 20
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 20
  },
  optionsContainer: {
    gap: 10
  },
  optionButton: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#f9fafb'
  },
  optionButtonSelected: {
    borderColor: '#0088FE',
    backgroundColor: '#eff6ff'
  },
  optionText: {
    fontSize: 14,
    color: '#6b7280'
  },
  optionTextSelected: {
    color: '#0088FE',
    fontWeight: '600'
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30
  },
  button: {
    flex: 1,
    backgroundColor: '#0088FE',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonDisabled: {
    opacity: 0.5
  },
  submitButton: {
    backgroundColor: '#00C49F'
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600'
  }
});

export default SurveyScreen;
