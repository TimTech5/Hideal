import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import apiClient from '../services/api';

const DashboardScreen = ({ navigation }) => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Placeholder - integrate with actual API
      setMetrics({
        totalConsumers: 1250,
        surveyCompleted: 450,
        activePromotions: 8,
        todayResponses: 25
      });
    } catch (error) {
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0088FE" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>

      {metrics && (
        <>
          {/* Metrics Grid */}
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{metrics.totalConsumers}</Text>
              <Text style={styles.metricLabel}>Total Consumers</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{metrics.activePromotions}</Text>
              <Text style={styles.metricLabel}>Active Promotions</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{metrics.surveyCompleted}</Text>
              <Text style={styles.metricLabel}>Surveys Done</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>{metrics.todayResponses}</Text>
              <Text style={styles.metricLabel}>Today's Responses</Text>
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Survey')}
            >
              <Text style={styles.actionButtonText}>📋 Deploy Survey</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => navigation.navigate('Promotions')}
            >
              <Text style={styles.actionButtonText}>🎯 View Promotions</Text>
            </TouchableOpacity>
          </View>

          {/* Quick Info */}
          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Quick Info</Text>
            <Text style={styles.infoText}>
              • You have 3 pending surveys to complete
            </Text>
            <Text style={styles.infoText}>
              • 2 new promotions available for your bar
            </Text>
            <Text style={styles.infoText}>
              • Performance: 95% survey completion rate
            </Text>
          </View>
        </>
      )}
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
  metricsGrid: {
    display: 'flex',
    gap: 10,
    marginBottom: 20
  },
  metricCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0088FE',
    marginBottom: 10
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827'
  },
  metricLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 5
  },
  buttonGroup: {
    gap: 10,
    marginBottom: 20
  },
  actionButton: {
    backgroundColor: '#0088FE',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center'
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600'
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#00C49F'
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10
  },
  infoText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 20
  }
});

export default DashboardScreen;
