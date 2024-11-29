package com.moallimi.moallimi.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.moallimi.moallimi.model.RefreshToken;
import com.moallimi.moallimi.model.User;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
  Optional<RefreshToken> findByToken(String token);

  List<RefreshToken> findByUserId(Long userId);

  @Modifying
  int deleteAllByUserId(@Param("userId") Long userId);

  @Modifying
  int deleteByUser(User user);
}
