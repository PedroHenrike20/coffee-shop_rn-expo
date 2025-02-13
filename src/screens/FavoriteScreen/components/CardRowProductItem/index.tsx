import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { ProductModel } from '@/src/models/ProductModel';

type CardRowProductItemProps = {
    productItem: ProductModel;
    onCardPress: () => void;
    onAddProduct: () => void;
  };

const CardRowProductItem: React.FC<CardRowProductItemProps> = 
({ onAddProduct, onCardPress, productItem }) => {

        const descriptionLimit = 65;
        const truncatedDescription = productItem.description.slice(0, descriptionLimit);

        return (
          <TouchableOpacity onPress={onCardPress}>
            <View style={styles.containerCard}>
              <Image
                style={styles.imgProduct}
                source={{ uri: productItem.imageSmallUrl }}
              />
              <View style={styles.containerRowAssessment}>
                <AntDesign name="star" color="#FBBE21" size={12} />
                <Text style={styles.textAssessmentProduct}>
                  {productItem.assessment}
                </Text>
              </View>
              <View style={styles.containerContent}>
                <View style={styles.containerDescription}>
                  <Text style={styles.titleProdut}>{productItem.name}</Text>
                  <Text style={styles.descriptionProdut}>
                    {productItem.typeProduct}
                  </Text>
                  <Text style={styles.descriptionProdut}>
                    {truncatedDescription + '...'}
                  </Text>
                </View>
                <View style={styles.containerRowAction}>
                  <View>
                    <Text style={styles.textPriceProduct}>
                      {Intl.NumberFormat("pt-BR", {
                        currency: "BRL",
                        style: "currency",
                      }).format(
                        productItem.prices.find((item) => item.isActive === true)
                          ?.price!
                      )}
                    </Text>
                    <Text style={styles.descriptionProdut}>{productItem.prices.find((item) => item.isActive === true)?.size}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={onAddProduct}
                    style={styles.addProductButton}
                  >
                    <MaterialCommunityIcons name="plus" size={22} color="#FFF" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }

export default CardRowProductItem;