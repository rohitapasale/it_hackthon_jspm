import { Entrepreneur, ConsortiumSplitMember, GovernmentScheme } from '@/types';
import { SEED_SCHEMES } from '@/data/seedData';

export interface MatchResult {
  entrepreneur: Entrepreneur;
  totalScore: number;
  breakdown: {
    semanticScore: number;
    capacityScore: number;
    geoScore: number;
    equipmentScore: number;
    trustScore: number;
  };
  individualCapacity: number;
  canFulfillSolo: boolean;
  distanceKm: number;
}

export function calculateDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

export function evaluateSellerMatch(
  queryCategory: string,
  requiredUnits: number,
  entrepreneur: Entrepreneur,
  buyerLocation: { lat: number; lng: number }
): MatchResult {
  // 1. Semantic Similarity (0.35)
  const isCategoryMatch = entrepreneur.category.toLowerCase().includes(queryCategory.toLowerCase()) ||
    queryCategory.toLowerCase().includes(entrepreneur.category.toLowerCase()) ||
    entrepreneur.trade.toLowerCase().includes(queryCategory.toLowerCase());
  const semanticScore = isCategoryMatch ? 0.95 : 0.40;

  // 2. Capacity Feasibility (0.25)
  const availableCapacity = Math.max(0, entrepreneur.weeklyCapacity - entrepreneur.currentBookedUnits);
  const capacityRatio = availableCapacity / (requiredUnits || 1);
  const capacityScore = Math.min(1, capacityRatio >= 1 ? 1 : capacityRatio * 1.2);
  const canFulfillSolo = availableCapacity >= requiredUnits;

  // 3. Geo Proximity (0.20)
  const distance = calculateDistanceKm(
    buyerLocation.lat,
    buyerLocation.lng,
    entrepreneur.location.lat,
    entrepreneur.location.lng
  );
  const withinTravelRadius = distance <= entrepreneur.location.travelRadiusKm;
  const geoScore = withinTravelRadius
    ? Math.max(0.2, 1 - distance / (entrepreneur.location.travelRadiusKm * 1.5))
    : Math.max(0.1, 0.7 - distance / 30);

  // 4. Equipment Match (0.10)
  const equipmentScore = entrepreneur.machinery.length >= 2 ? 0.95 : 0.65;

  // 5. Trust Metric (0.10)
  const trustScore = (entrepreneur.rating / 5) * (entrepreneur.onTimeRate / 100);

  // Multi-factor formula
  const totalScore = Math.round(
    (0.35 * semanticScore +
      0.25 * capacityScore +
      0.20 * geoScore +
      0.10 * equipmentScore +
      0.10 * trustScore) *
      100
  );

  return {
    entrepreneur,
    totalScore,
    breakdown: {
      semanticScore: Math.round(semanticScore * 100),
      capacityScore: Math.round(capacityScore * 100),
      geoScore: Math.round(geoScore * 100),
      equipmentScore: Math.round(equipmentScore * 100),
      trustScore: Math.round(trustScore * 100)
    },
    individualCapacity: availableCapacity,
    canFulfillSolo,
    distanceKm: distance
  };
}

export function solveConsortiumSplit(
  requiredUnits: number,
  unitBudget: number,
  candidates: MatchResult[]
): {
  isConsortiumNeeded: boolean;
  allocations: ConsortiumSplitMember[];
  totalAllocated: number;
  totalAdvanceReleased: number;
  totalContractValue: number;
} {
  const eligibleSellers = candidates.filter(c => c.totalScore >= 50);
  const totalContractValue = requiredUnits * unitBudget;
  const advanceRate = 0.35; // 35% advance for raw materials

  // Check if top seller can handle it alone
  if (eligibleSellers.length > 0 && eligibleSellers[0].canFulfillSolo) {
    const solo = eligibleSellers[0].entrepreneur;
    return {
      isConsortiumNeeded: false,
      allocations: [
        {
          entrepreneurId: solo.id,
          entrepreneurName: solo.name,
          allocatedUnits: requiredUnits,
          advanceAmount: Math.round(totalContractValue * advanceRate),
          totalPayout: totalContractValue,
          equipmentMatched: solo.machinery[0],
          status: 'CONFIRMED'
        }
      ],
      totalAllocated: requiredUnits,
      totalAdvanceReleased: Math.round(totalContractValue * advanceRate),
      totalContractValue
    };
  }

  // Need consortium: distribute among top 2-4 candidates proportionally by available capacity
  const pool = eligibleSellers.slice(0, 3);
  const totalPoolCapacity = pool.reduce((acc, curr) => acc + curr.individualCapacity, 0);

  let remaining = requiredUnits;
  const allocations: ConsortiumSplitMember[] = pool.map((item, idx) => {
    let units = 0;
    if (idx === pool.length - 1) {
      units = remaining; // remainder to last
    } else {
      const share = totalPoolCapacity > 0 ? item.individualCapacity / totalPoolCapacity : 1 / pool.length;
      units = Math.min(remaining, Math.round(requiredUnits * share));
      remaining -= units;
    }

    const sellerPayout = units * unitBudget;
    const sellerAdvance = Math.round(sellerPayout * advanceRate);

    return {
      entrepreneurId: item.entrepreneur.id,
      entrepreneurName: item.entrepreneur.name,
      allocatedUnits: units,
      advanceAmount: sellerAdvance,
      totalPayout: sellerPayout,
      equipmentMatched: item.entrepreneur.machinery[0] || 'Standard Equipment',
      status: 'CONFIRMED'
    };
  });

  const totalAllocated = allocations.reduce((sum, a) => sum + a.allocatedUnits, 0);
  const totalAdvanceReleased = allocations.reduce((sum, a) => sum + a.advanceAmount, 0);

  return {
    isConsortiumNeeded: true,
    allocations,
    totalAllocated,
    totalAdvanceReleased,
    totalContractValue
  };
}

export function getEligibleSchemesForEntrepreneur(
  entrepreneur: Entrepreneur
): GovernmentScheme[] {
  return SEED_SCHEMES.filter(scheme => {
    if (scheme.code === 'UDYAM-ASSIST') return true;
    if (scheme.code === 'PM-VISHWAKARMA' && (entrepreneur.category === 'Tailoring' || entrepreneur.category === 'Handicrafts' || entrepreneur.category === 'Repair & Electronics')) {
      return true;
    }
    if (scheme.code === 'MUDRA-SHISHU') return true;
    if (scheme.code === 'PM-SVANIDHI' && (entrepreneur.category === 'Repair & Electronics' || entrepreneur.category === 'Food & Bakery')) {
      return true;
    }
    return false;
  });
}
