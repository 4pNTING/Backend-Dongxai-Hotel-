// src/infrastructure/persistence/entities/room.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { BookingEntity } from './booking.entity';
import { CheckInEntity } from './check-in.entity';
import { CheckOutEntity } from './check-out.entity';
import { RoomTypeEntity } from './room-type.entity';
import { RoomStatusEntity } from './room-status.entity';

@Entity('rooms')
export class RoomEntity {
  @PrimaryGeneratedColumn({ type: 'integer' })
  RoomId: number;

  @Column({ type: 'integer' })
  TypeId: number;

  @ManyToOne(() => RoomTypeEntity, { eager: true })
  @JoinColumn({ name: 'TypeId' })
  roomType: RoomTypeEntity;

  @Column({ type: 'integer' })
  StatusId: number;

  @ManyToOne(() => RoomStatusEntity, { eager: true })
  @JoinColumn({ name: 'StatusId' })
  roomStatus: RoomStatusEntity;

  @Column({ type: 'integer', nullable: true })
  RoomPrice: number;

  @OneToMany(() => BookingEntity, booking => booking.room)
  bookings: BookingEntity[];

  @OneToMany(() => CheckInEntity, checkIn => checkIn.room)
  checkIns: CheckInEntity[];

  @OneToMany(() => CheckOutEntity, checkOut => checkOut.room)
  checkOuts: CheckOutEntity[];

  

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}