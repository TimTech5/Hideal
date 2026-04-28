import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';

const PromotionScreen = () => {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    try {
      // Mock promotions data
      setPromotions([
        {
          id: 1,
          brandName: 'Brand A',
          discount: '20%',
          description: 'Get 20% off on all Brand A drinks',
          validUntil: '2026-05-15',
          color: '#FF8042'
        },
        {
          id: 2,
          brandName: 'Brand B',
          discount: '15%',
          description: 'Happy hour special - 15% discount',
          validUntil: '2026-05-20',
          color: '#00C49F'
        },
        {
          id: 3,
          brandName: 'Brand C',
          discount: 'Buy 2 Get 1',
          description: 'Buy 2 drinks, get 1 free',
          validUntil: '2026-05-25',
          color: '#FFBB28'
        }
      ]);
    } catch (error) {
      console.error('Error fetching promotions:', error);
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
      <Text style={styles.title}>Current Promotions</Text>
      <Text style={styles.subtitle}>Share these offers with customers!</Text>

      <View style={styles.promotionsContainer}>
        {promotions.map((promo) => (
          <View
            key={promo.id}
            style={[styles.promotionCard, { borderLeftColor: promo.color }]}
          >
            <View style={styles.promotionHeader}>
              <Text style={styles.brandName}>{promo.brandName}</Text>
              <Text style={[styles.discount, { color: promo.color }]}>
                {promo.discount}
              </Text>
            </View>

            <Text style={styles.description}>{promo.description}</Text>

            <View style={styles.promotionFooter}>
              <Text style={styles.validUntil}>
                Valid until: {promo.validUntil}
              </Text>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>

      {/* Info Section */}
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Tips for Maximum Engagement</Text>
        <Text style={styles.infoPoint}>✓ Display promotions at the bar counter</Text>
        <Text style={styles.infoPoint}>✓ Mention offers during customer surveys</Text>
        <Text style={styles.infoPoint}>✓ Track which promotions drive the most engagement</Text>
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
    marginBottom: 5
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20
  },
  promotionsContainer: {
    gap: 15,
    marginBottom: 20
  },
  promotionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4
  },
  promotionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827'
  },
  discount: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 10,
    lineHeight: 20
  },
  promotionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  validUntil: {
    fontSize: 12,
    color: '#9ca3af'
  },
  shareButton: {
    backgroundColor: '#0088FE',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  infoSection: {
    backgroundColor: '#eff6ff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 30
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10
  },
  infoPoint: {
    fontSize: 14,
    color: '#0088FE',
    marginBottom: 8,
    lineHeight: 20
  }
});

export default PromotionScreen;
